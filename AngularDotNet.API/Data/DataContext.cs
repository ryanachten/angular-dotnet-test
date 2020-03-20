using AngularDotnet.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNet.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
    }
}