using System.Threading.Tasks;
using AngularDotnet.API.Data;
using AngularDotnet.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotnet.API.Controllers
{
    // Will be available via /api/auth
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }

        // Method available via /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password)
        {

            // TODO: validate request

            // Prevent duplicate usernames with capitalisation difference
            username = username.ToLower();

            if (await _repo.UserExists(username))
            {
                // Return error if user exists in DB
                return BadRequest("Username already exists");
            }

            // Create new user instance
            var userToCreate = new User
            {

                // TODO: Add other data once the User model gets fleshed out
                Username = username
            };

            var createdUser = await _repo.Register(userToCreate, password);

            // TODO: Return a sucess msg to calling method via CreatedAtRoute()
            // instead of just a status code
            return StatusCode(201);

        }
    }
}