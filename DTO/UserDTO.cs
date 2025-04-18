﻿using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.DTO
{
    public class UserDTO
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
