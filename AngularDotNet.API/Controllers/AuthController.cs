using System.Threading.Tasks;
using AngularDotnet.API.Data;
using AngularDotnet.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotnet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password)
        {
            // TODO: validate request
            username = username.ToLower();
            if (await _repo.UserExists(username))
                return BadRequest("User name already exists");

            var userToCreate = new User
            {
                Username = username
            };

            var createdUser = await _repo.Register(userToCreate, password);

            // TODO: should be using CreatedAtRoute
            return StatusCode(201);
        }
    }
}