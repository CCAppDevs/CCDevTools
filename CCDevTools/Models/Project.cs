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
        public ICollection<Ticket> Tickets { get; set; }
    }
}
