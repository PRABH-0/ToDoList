using AuthWebAPIDemo.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthWebAPIDemo.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

    }
}
