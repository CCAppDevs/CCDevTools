using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CCDevTools.Data;
using CCDevTools.Models;

namespace CCDevTools.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskBoardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskBoardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskBoards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectBoardViewModel>>> GetTaskBoards()
        {
          if (_context.TaskBoards == null)
          {
              return NotFound();
          }
            return await _context.TaskBoards
                .Include(b => b.Categories)
                .ThenInclude(c => c.Tasks)
                .Select(b => new ProjectBoardViewModel
                {
                    Id = b.Id,
                    ProjectId = b.ProjectId,
                    Name = b.Name,
                    Description = b.Description,
                    Categories = b.Categories.Select(c => new ProjectBoardCategoryViewModel {
                        Id = c.Id,
                        Name = c.Name,
                        Tasks = c.Tasks.ToList(),
                    }).ToList()
                })
                .ToListAsync();
        }

        // GET: api/TaskBoards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectBoardViewModel>> GetProjectTaskBoard(int id)
        {
          if (_context.TaskBoards == null)
          {
              return NotFound();
          }
            var projectTaskBoard = await _context.TaskBoards.Where(b => b.Id == id)
                .Include(b => b.Categories)
                .ThenInclude(c => c.Tasks)
                .Select(b => new ProjectBoardViewModel
                {
                    Id = b.Id,
                    ProjectId = b.ProjectId,
                    Name = b.Name,
                    Description = b.Description,
                    Categories = b.Categories.Select(c => new ProjectBoardCategoryViewModel
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Tasks = c.Tasks.ToList(),
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (projectTaskBoard == null)
            {
                return NotFound();
            }

            return projectTaskBoard;
        }

        // PUT: api/TaskBoards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectTaskBoard(int id, ProjectTaskBoard projectTaskBoard)
        {
            if (id != projectTaskBoard.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTaskBoard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTaskBoardExists(id))
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

        // POST: api/TaskBoards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectTaskBoard>> PostProjectTaskBoard(ProjectTaskBoard projectTaskBoard)
        {
          if (_context.TaskBoards == null)
          {
              return Problem("Entity set 'ApplicationDbContext.TaskBoards'  is null.");
          }
            _context.TaskBoards.Add(projectTaskBoard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectTaskBoard", new { id = projectTaskBoard.Id }, projectTaskBoard);
        }

        // DELETE: api/TaskBoards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTaskBoard(int id)
        {
            if (_context.TaskBoards == null)
            {
                return NotFound();
            }
            var projectTaskBoard = await _context.TaskBoards.FindAsync(id);
            if (projectTaskBoard == null)
            {
                return NotFound();
            }

            _context.TaskBoards.Remove(projectTaskBoard);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTaskBoardExists(int id)
        {
            return (_context.TaskBoards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
