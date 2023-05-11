namespace CCDevTools.Models
{
    public class Membership
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string UserId { get; set; }
        public int Level { get; set; }

        // navigation properties
        public virtual Project Project { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}