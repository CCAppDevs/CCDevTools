using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CCDevTools.Data;
using CCDevTools.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace CCDevTools.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthorizationService _auth;

        public ProjectsController(ApplicationDbContext context, UserManager<ApplicationUser> usr, IAuthorizationService auth)
        {
            _context = context;
            _userManager = usr;
            _auth = auth;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return NotFound();
            }

            var membershipList = await _context.Memberships
                .Where(m => m.UserId == userId)
                .Select(m => m.ProjectId)
                .ToListAsync();



            return await _context.Projects
                .Where(p => membershipList.Contains(p.Id))
                .Include(p => p.Invitations)
                .Include(p => p.Tickets).ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            var project = await _context.Projects
                .Include(p => p.Tickets)
                .Include(p => p.Invitations)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            // check if we are able to modify the entry (maintainer or better, level 10 or lower)
            AuthorizationResult result = await _auth.AuthorizeAsync(User, project, "IsMaintainer");

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
          if (_context.Projects == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Projects'  is null.");
          }

          // TODO: Add a membership to the new project for the user as an owner
          var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }
            
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            if (project.Id > 0)
            {
                _context.Memberships.Add(new Membership
                {
                    UserId = userId,
                    ProjectId = project.Id,
                    Level = 0
                });
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id });
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }

            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            // only allow if the user is an owner of the project
            AuthorizationResult result = await _auth.AuthorizeAsync(User, project, "IsOwner");

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
