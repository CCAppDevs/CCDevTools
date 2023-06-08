using Microsoft.AspNetCore.Authorization;

namespace CCDevTools.Infrastructure
{
    public class LevelRequirement : IAuthorizationRequirement
    {
        public LevelRequirement(int level) {
            Level = level;
        }

        public int Level { get; }
    }
}
