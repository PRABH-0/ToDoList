﻿namespace AuthWebAPIDemo.Model
{
    public class RefreshTokenRequestDto
    {
        public int UserId { get; set; } 
        public string RefreshToken { get; set; } = string.Empty;
    }
}
