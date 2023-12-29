
using Driver.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Driver.ViewModel;

namespace Driver.Services
{
    public class AppClaimTypes
    {
        internal const string AreaId = "AreaId";
        internal const string RolId = "RolId";
        internal const string InstructorId = "InstructorId";
    }
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User ChangePassword(ChangePasswordRequest model);
        User ResetPassword(RestPasswordRequest model, bool isResetDefault);
        
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications


        private readonly AppSettings _appSettings;
        private readonly DriverContext _db;
        private readonly IEmailService _emailService= null;

        public UserService(IOptions<AppSettings> appSettings, DriverContext db, IEmailService emailService)
        {
            _appSettings = appSettings.Value;
            _db = db;
            _emailService = emailService;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
             var user = GetUser(model.Username, model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var hours = _appSettings.SessionActiveHours;
            var token = generateJwtToken(user, hours);

            return new AuthenticateResponse(user, token);
        }


        private User GetUser(string userName, string pwd)
        {
            var usr = GetUser(userName);
            //si el usuario existe y la contrasena es valida
            if (usr != null && String.Compare(usr.Password, UserHelpers.GetPasswordHashedSHA256(pwd), true) == 0)
                return usr;

            return null;
        }

         private User GetUser(string userName)
        {
            var result = _db.Users.Include(x => x.Area).Include(x => x.Rol).ThenInclude(x => x.RolResources).FirstOrDefault(x => x.Username == userName);
            return result;
        }

        // helper methods

        private string generateJwtToken(User user, double time)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = CreateClaims(user),
                Expires = DateTime.UtcNow.AddHours(time),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private ClaimsIdentity CreateClaims(User user)
        {
            //Crear identidad principal
            var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Username) });

            //Agregar resursos
            identity.AddClaim(new Claim(AppClaimTypes.AreaId, user.AreaId.ToString()));
            identity.AddClaim(new Claim(AppClaimTypes.RolId, user.RolId.ToString()));
            identity.AddClaim(new Claim(AppClaimTypes.InstructorId, (user.InstructorId??0).ToString()));

            return identity;
        }

        public User ChangePassword(ChangePasswordRequest model)
        {

           var pass = UserHelpers.GetPasswordHashedSHA256(model.OldPassword);
            
            var user = _db.Users.FirstOrDefault(x => x.Username == model.Username && x.Password == pass);

            if(user == null)
                return null;

            var newPass = UserHelpers.GetPasswordHashedSHA256(model.NewPassword);
            user.Password = newPass;

            _db.SaveChanges();           

            return user;

        }

        public User ResetPassword(RestPasswordRequest model, bool isResetDefault)
        {
            var user = _db.Users.FirstOrDefault(x => x.Username == model.Username || x.Email == model.Username);
            if (user == null || user.Active==false) return null;           

            var newPassword = string.Empty;

            if(isResetDefault)
                newPassword = _appSettings.GenericPassword;
            else
                newPassword = CreatePassword(_appSettings.GenericPasswordLength);

            user.Password = UserHelpers.GetPasswordHashedSHA256(newPassword);

            _db.SaveChanges();  

            if(!isResetDefault){

                var mail = new MailMessage(_appSettings.From, user.Email);

                mail.Subject = "Restablecer contraseña.";
                mail.Body = $"Estimado usuario se ha restablecido su contraseña, favor ingresar al sistema con su usuario {user.Username} y la nueva contraseña {newPassword}";

                _emailService.SendEmailAsync(mail);
                
            }

            return user;

        }

        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }
    }
}