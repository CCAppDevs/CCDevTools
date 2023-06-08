using Microsoft.AspNetCore.Identity;

namespace CCDevTools.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Membership> Memberships { get; set; }
    }
}