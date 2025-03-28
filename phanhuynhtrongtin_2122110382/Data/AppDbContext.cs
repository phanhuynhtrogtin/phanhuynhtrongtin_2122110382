using phanhuynhtrongtin_2122110382.Model;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace phanhuynhtrongtin_2122110382.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }

}
