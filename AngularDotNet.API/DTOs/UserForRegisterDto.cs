using System.ComponentModel.DataAnnotations;

namespace AngularDotnet.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 10 characters")]
        public string Password { get; set; }
    }
}