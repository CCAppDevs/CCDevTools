using CCDevTools.Data;
using CCDevTools.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CCDevTools.Infrastructure
{
    public class MembershipRequirementHandler : AuthorizationHandler<LevelRequirement>
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public MembershipRequirementHandler(ApplicationDbContext ctx, UserManager<ApplicationUser> usr)
        {
            _context = ctx;
            _userManager = usr;
        }

        // constructor (inject the dbcontext)
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext authContext, LevelRequirement requirement)
        {
            // the project id
            var project = authContext.Resource as Project;

            // if project is null
            if (project == null)
            {
                return Task.CompletedTask;
            }

            // the user id
            var userId = _userManager.GetUserId(authContext.User);

            // the membership
            var membership = _context.Memberships
                .Where(m => m.UserId == userId && m.ProjectId == project.Id)
                .FirstOrDefault();
            
            if (membership == null)
            {
                return Task.CompletedTask;
            }

            // requirement level to check against
            if (membership.Level <= requirement.Level)
            {
                authContext.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
