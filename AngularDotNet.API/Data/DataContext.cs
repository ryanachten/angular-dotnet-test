using AngularDotNet.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNet.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> MyProperty { get; set; }
    }
}