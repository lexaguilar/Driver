using System.ComponentModel.DataAnnotations;

namespace Driver.ViewModel
{  

    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class ChangePasswordRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string RepeatPassword { get; set; }
    }

    public class RestPasswordRequest
    {
        [Required]
        public string Username { get; set; }
    }

}