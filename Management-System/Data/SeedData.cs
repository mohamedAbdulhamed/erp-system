using Microsoft.AspNetCore.Identity;
using ManagementSystem.Models;
using System.Security.Claims;
using ManagementSystem.Models;
using ManagementSystem.Data;

namespace ManagementSystem.Data
{
    public class SeedData
    {
        public static async Task SeedDbDefaultData(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            AppDbContext context)
        {
            var logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger("SeedData");

            // Define roles
            var roles = new[] { "Admin", "Accountant" , "Sailer" };

            // Ensure roles are created
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // Get admin user details from appsettings.json (use Env)
            var adminUsername = configuration["AdminUser:UserName"] ?? throw new InvalidOperationException("Admin UserName configuration is missing or null.");
            var adminFirstname = configuration["AdminUser:FirstName"] ?? throw new InvalidOperationException("Admin username FirstName is missing or null.");
            var adminLastname = configuration["AdminUser:LastName"] ?? throw new InvalidOperationException("Admin LastName configuration is missing or null.");
            var adminEmail = configuration["AdminUser:Email"] ?? throw new InvalidOperationException("Admin Email configuration is missing or null.");
            var adminPassword = configuration["AdminUser:Password"] ?? throw new InvalidOperationException("Admin Password configuration is missing or null.");

            // Create admin user if not exists
            if (await userManager.FindByNameAsync(adminUsername) == null)
            {
                var adminUser = new User
                {
                   
                    UserName = adminUsername,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, adminPassword);
                if (result.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(adminUser, "Admin");
                    if (!roleResult.Succeeded)
                        logger.LogError(string.Join(", ", roleResult.Errors.Select(e => e.Description)));

                  
                }
                else
                {
                    logger.LogError(string.Join(", ", result.Errors.Select(e => e.Description)));
                }

            }


               
            }
        }
    }

