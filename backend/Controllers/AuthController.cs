using AuthWebAPIDemo.Entities;
using AuthWebAPIDemo.Model;
using AuthWebAPIDemo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthWebAPIDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        private static User user = new ();
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var user = await _authService.RegisterAsync(request);
            if (user == null)
                return BadRequest("Username already exist");
            return Ok(user);    
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserDto request)
        {
            var token = await _authService.LoginAsync(request);
            if (token is null)
                return BadRequest("Username Or Password are wrong");
            return Ok(token);
        }
        [HttpGet("Get-AllUser")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _authService.GetAllUsersAsync());
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
        {
            var token = await _authService.RefreshTokenAsync(request);
            if (token is null)
                return BadRequest("Invalid/expired token");
            return Ok(token);
        }

        [HttpGet("Auth-endpoint")]
        [Authorize]
        public ActionResult AuthCheck()
        {
            return Ok();
        }

        [HttpGet("Admin-endpoint")]
        [Authorize(Roles ="Admin")]
        public ActionResult AdminCheck()
        {
            return Ok();
        }
    }
}
