using System.Threading.Tasks;
using AngularDotnet.API.Models;

namespace AngularDotnet.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}