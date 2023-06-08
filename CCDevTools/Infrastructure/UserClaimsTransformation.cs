using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace CCDevTools.Infrastructure
{
    public class UserClaimsTransformation : IClaimsTransformation
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            var claimType = "email";

            

            if (!principal.HasClaim(claim => claim.Type == claimType))
            {
                claimsIdentity.AddClaim(new Claim(claimType, "email"));
            }
            
            principal.AddIdentity(claimsIdentity);
            
            return Task.FromResult(principal);
        }
    }
}
