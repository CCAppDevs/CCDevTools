using System.ComponentModel.DataAnnotations;

namespace CCDevTools.Models
{
    public class Project
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public string Version { get; set; }
        public string? Url { get; set; }

        // Nav Properties
        public virtual ICollection<Ticket> Tickets { get; set; }

        public virtual ICollection<Membership> Memberships { get; set; }
        public virtual ICollection<Invitation> Invitations { get; set; }
    }
}
