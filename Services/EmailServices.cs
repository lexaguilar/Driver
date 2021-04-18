
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
using System.Threading.Tasks;

namespace Driver.Services
{
    public interface IEmailService{
        void SendEmailAsync(MailMessage email);
    }

    public class EmailService : IEmailService
    {

         private readonly SmtpSetting _smtpSetting;
        private readonly DriverContext _db;

        public EmailService(IOptionsSnapshot<AppSettings> snapshot, DriverContext db)
        {
            _smtpSetting = snapshot.Value.SmtpSetting;
            _db = db;
        }

        public void SendEmailAsync(MailMessage email)
        {
            using(SmtpClient client = new SmtpClient(_smtpSetting.Host, _smtpSetting.Port)){    
                client.Credentials = new System.Net.NetworkCredential(_smtpSetting.Email, _smtpSetting.Password);  
                client.EnableSsl = _smtpSetting.UseSSL;
                client.Send(email);
            }
        }

    }
}