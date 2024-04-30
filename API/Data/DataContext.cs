using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) // the base class is the db context
    {
    }


    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserLike>()
            .HasKey(k => new { k.SourceUserId, k.TargetUserId });

        builder.Entity<UserLike>()
            .HasOne(ul => ul.SourceUser)
            .WithMany(u => u.LikedUsers)
            .HasForeignKey(ul => ul.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserLike>()
            .HasOne(ul => ul.TargetUser)
            .WithMany(u => u.LikedByUsers)
            .HasForeignKey(ul => ul.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(u => u.MessagesRecieved)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(u => u.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
