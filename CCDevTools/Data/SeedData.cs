using CCDevTools.Models;
using Microsoft.AspNetCore.Identity;

namespace CCDevTools.Data
{
    public class SeedData
    {
        public static async Task EnsurePopulated(IServiceProvider services)
        {
            ApplicationDbContext context = services.GetService<ApplicationDbContext>();
            UserManager<ApplicationUser> userManager = services.GetService<UserManager<ApplicationUser>>();
            IConfiguration configuration = services.GetService<IConfiguration>();

            if (context == null)
            {
                throw new NullReferenceException("No context available");
            }

            if (userManager == null)
            {
                throw new NullReferenceException("No user manager available.");
            }

            // check if users exist
            // if not, create them with default passwords
            
            for (int i = 0; i < 3; i++)
            {
                string username = configuration["SeedData:user" + i + ":username"];
                string password = configuration["SeedData:user" + i + ":password"];
                var user = await userManager.FindByEmailAsync(username);

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = username,
                        Email = username,
                        EmailConfirmed = true
                    };

                    // create a user
                    var task = await userManager.CreateAsync(user, password);

                    user = await userManager.FindByEmailAsync(username);

                    if (user == null)
                    {
                        throw new NullReferenceException("User was not found.");
                    }

                    Project seed = new Project
                    {
                        // id blank
                        Name = username + " project",
                        Description = "A starter project",
                        StartDate = DateTime.Now,
                        Version = "0.0.1",
                        Url = "https://github.com/CCAppDevs/CCDevTools",
                        Tickets = new List<Ticket>
                        {
                            new Ticket
                                {
                                    Description = "Fix the front page",
                                    Status = 0,
                                    Created = DateTime.Now
                                }
                        },
                        Memberships = new List<Membership>
                        {
                            new Membership
                            {
                                Level = 0,
                                UserId = user.Id
                            }
                        }
                    };

                    context.Projects.Add(seed);

                    await context.SaveChangesAsync();
                }

            }

            //if (context.Projects.Count() == 0)
            //{

            //    if (context.TaskBoards.Count() == 0)
            //    {
            //        ProjectTaskBoard board = new ProjectTaskBoard
            //        {
            //            Name = "CCDevTools",
            //            Description = "The planning board for CCDevTools",
            //            ProjectId = seed.Id,
            //            Categories = new List<ProjectTaskCategory>()
            //            {
            //                new ProjectTaskCategory
            //                {
            //                    Name = "User Stories",
            //                    Tasks = new List<ProjectTaskItem>()
            //                    {
            //                        new ProjectTaskItem
            //                        {
            //                            Description = "As a user I want to be able to log into the system so that I may save my preferences."
            //                        }
            //                    }
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "Selected User Stories"
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "Backlog"
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "Current Sprint"
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "In Progress"
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "Testing"
            //                },
            //                new ProjectTaskCategory
            //                {
            //                    Name = "Complete"
            //                }
            //            }
            //        };

            //        context.TaskBoards.Add(board);

            //        await context.SaveChangesAsync();
            //    }
            //}

            
        }
    }
}
