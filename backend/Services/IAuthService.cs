using AuthWebAPIDemo.Entities;
using AuthWebAPIDemo.Model;
using Microsoft.AspNetCore.Mvc;

namespace AuthWebAPIDemo.Services
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(UserDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
        Task<TokenResponseDto> LoginAsync(UserDto request);
        Task<List<string>> GetAllUsersAsync();



    }
}
