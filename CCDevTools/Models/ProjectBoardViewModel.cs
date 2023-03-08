namespace CCDevTools.Models
{
    public class ProjectBoardViewModel
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ProjectBoardCategoryViewModel> Categories { get; set; }

    }

    public class ProjectBoardCategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProjectTaskItem> Tasks { get; set; }
    }
}
