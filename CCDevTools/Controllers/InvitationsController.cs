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

namespace CCDevTools.Controllers
{
    // TODO: Add authorization for individual owners only
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthorizationService _auth;
        private readonly UserManager<ApplicationUser> _userManager;

        public InvitationsController(ApplicationDbContext context, UserManager<ApplicationUser> usr, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
            _userManager = usr;
        }

        // GET: api/Invitations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invitation>>> GetInvitations()
        {
          if (_context.Invitations == null)
          {
              return NotFound();
          }
            return await _context.Invitations.ToListAsync();
        }

        // GET: api/Invitations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invitation>> GetInvitation(int id)
        {
          if (_context.Invitations == null)
          {
              return NotFound();
          }
            var invitation = await _context.Invitations.FindAsync(id);

            if (invitation == null)
            {
                return NotFound();
            }

            return invitation;
        }

        // PUT: api/Invitations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvitation(int id, Invitation invitation)
        {
            if (id != invitation.InvitationId)
            {
                return BadRequest();
            }

            _context.Entry(invitation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvitationExists(id))
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

        // POST: api/Invitations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invitation>> PostInvitation(Invitation invitation)
        {
          if (_context.Invitations == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Invitations'  is null.");
          }
            _context.Invitations.Add(invitation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvitation", new { id = invitation.InvitationId }, invitation);
        }

        // DELETE: api/Invitations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {

            if (_context.Invitations == null)
            {
                return NotFound();
            }

            var invitation = await _context.Invitations.FindAsync(id);
            if (invitation == null)
            {
                return NotFound();
            }

            AuthorizationResult matchesUser = await _auth.AuthorizeAsync(User, invitation, "InvitationMatchesUser");
            var project = _context.Projects.FindAsync(invitation.ProjectId);
            AuthorizationResult isOwner = await _auth.AuthorizeAsync(User, project, "IsOwner");
            

            if (!matchesUser.Succeeded && !isOwner.Succeeded)
            {
                return Unauthorized();
            }

            _context.Invitations.Remove(invitation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvitationExists(int id)
        {
            return (_context.Invitations?.Any(e => e.InvitationId == id)).GetValueOrDefault();
        }
    }
}
