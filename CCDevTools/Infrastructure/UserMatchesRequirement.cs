using Microsoft.AspNetCore.Authorization;

namespace CCDevTools.Infrastructure
{
    public class UserMatchesRequirement : IAuthorizationRequirement
    {
        public UserMatchesRequirement() {
            userMatches = true;
        }
        public bool userMatches { get; }
    }
}
