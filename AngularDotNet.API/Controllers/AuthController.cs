using System.Threading.Tasks;
using AngularDotnet.API.Data;
using AngularDotnet.API.DTOs;
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
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // TODO: validate request
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("User name already exists");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            // TODO: should be using CreatedAtRoute
            return StatusCode(201);
        }
    }
}