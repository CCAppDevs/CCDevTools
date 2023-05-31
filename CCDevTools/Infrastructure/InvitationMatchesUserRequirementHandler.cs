using CCDevTools.Data;
using CCDevTools.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CCDevTools.Infrastructure
{
    public class InvitationMatchesUserRequirementHandler : AuthorizationHandler<UserMatchesRequirement>
    {

        private readonly ApplicationDbContext _context;

        public InvitationMatchesUserRequirementHandler(ApplicationDbContext ctx)
        {
            _context = ctx;
        }

        protected override  Task HandleRequirementAsync(AuthorizationHandlerContext authContext, UserMatchesRequirement requirement)
        {
            var invitation = authContext.Resource as Invitation;

            if (invitation == null)
            {
                return Task.CompletedTask;
            }

            var userID = authContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userID == null)
            {
                return Task.CompletedTask;
            }

            var invitedUser = _context.Users.Where(u => u.Email == invitation.Email).FirstOrDefault();

            if (invitedUser == null)
            {
                return Task.CompletedTask;
            }

            if (invitedUser.Id == userID)
            {
                authContext.Succeed(requirement);
            }

            return Task.CompletedTask;
        }

    }
}
