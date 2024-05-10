namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository messageRepository { get; }
        ILikesRepository likesRepository { get; }
        Task<bool> Complete(); 
        bool HasChanes(); 
    }
}