using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) // the base class is the db context
    {
    }


    public DbSet <AppUser> Users { get; set; }
}
