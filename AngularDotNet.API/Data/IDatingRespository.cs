using System.Collections.Generic;
using System.Threading.Tasks;
using AngularDotnet.API.Models;

namespace AngularDotnet.API.Data
{
    public interface IDatingRespository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}