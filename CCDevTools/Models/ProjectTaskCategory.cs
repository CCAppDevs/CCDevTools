namespace CCDevTools.Models
{
    public class ProjectTaskCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int ProjectTaskBoardId { get; set; }
        public virtual ProjectTaskBoard ProjectTaskBoard { get; set; }

        public virtual ICollection<ProjectTaskItem> Tasks { get; set; }
    }
}
