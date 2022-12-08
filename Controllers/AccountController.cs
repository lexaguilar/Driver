using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Driver.Models;
using Driver.Services;
using Driver.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Driver.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly DriverContext db = null;
        private IUserService _userService;
        

        public AccountController(DriverContext _db, IUserService userService)
        {
            this.db = _db;
            _userService = userService;
            
        }

        [HttpPost("api/account/auth")]
        public IActionResult Auth([FromBody] AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest("El usario o contraseña es incorrecta");

            return Ok(response);
        }

        [HttpPost("api/account/changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest model)
        {

            if(model.NewPassword != model.RepeatPassword)
                return BadRequest("Las nuevas contraseñas no coninciden");

            if(model.NewPassword.Length < 5)
                return BadRequest("La nueva contraseña debe tener al menos 5 caracteres");

            var user = _userService.ChangePassword(model);

            if (user == null)
                return BadRequest("El usario o contraseña es incorrecta");

            return Ok(user);
        }

        [HttpPost("api/account/resetpassword")]
        public IActionResult Resetpassword([FromBody] RestPasswordRequest model)
        {

            if(string.IsNullOrEmpty(model.Username))
                return BadRequest("El usuario o correo es requerido");       

            var user = _userService.ResetPassword(model, false);

            if(user == null)
                return BadRequest("No se encontró el usuario");       

            return Ok(new { 
                email = user.Email
             });
        }

        [HttpPost("api/account/resetpassworddefault")]
        public IActionResult ResetpasswordDefault([FromBody] RestPasswordRequest model)
        {

            if(string.IsNullOrEmpty(model.Username))
                return BadRequest("El usuario o correo es requerido");       

            var user = _userService.ResetPassword(model, true);

            if(user == null)
                return BadRequest("No se encontró el usuario");       

            return Ok(new { 
                email = user.Email
             });
        }
    }
}
