using CCDevTools.Models;

namespace CCDevTools.Data
{
    public class SeedData
    {
        public static async Task EnsurePopulated(IServiceProvider services)
        {
            ApplicationDbContext context = services.GetService<ApplicationDbContext>();

            if (context == null)
            {
                throw new NullReferenceException("No context available");
            }

            if (context.Projects.Count() == 0)
            {
                Project seed = new Project
                {
                    // id blank
                    Name = "CCDevTools",
                    Description = "A set of tools for Centralia College Developers",
                    StartDate = DateTime.Now,
                    Version = "0.0.1",
                    Url = null,
                    Tickets = new List<Ticket>
                    {
                        new Ticket
                            {
                                Description = "Fix the front page",
                                Status = TicketStatus.Open,
                                Created = DateTime.Now
                            }
                    }
                };

                context.Projects.Add(seed);

                await context.SaveChangesAsync();
            }
        }
    }
}
