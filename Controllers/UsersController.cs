using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Driver.Extensions;
using Driver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Driver.Controllers
{  
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {      
        
        private DriverContext _db = null;
        private readonly AppSettings _appSettings;
        public UsersController(DriverContext db, IOptions<AppSettings> appSettings)
        {
            this._db = db;
            this._appSettings = appSettings.Value;
        }

        [HttpGet("[action]")]
        public IActionResult Get(int skip, int take)
        {

            
            var items = _db.Users.Select(x => new { x.Username, x.Email, x.FullName, x.RolId, x.AreaId, x.Active }).Skip(skip).Take(take != 0 ? take : 10).ToArray();
            return new JsonResult(new
            {
                items,
                totalCount = items.Count()
            });
        }
        
        [HttpPost("[action]")]
        public IActionResult Post([FromBody] User user)
        {
            
            var dbusr=_db.Users.FirstOrDefault(x => x.Username == user.Username);
            if(dbusr==null)
            {
                user.Username = user.Email.Split("@")[0];
                user.ToUpperCase();
                user.Active = true;
                _db.Users.Add(user);
                user.Password = UserHelpers.GetPasswordHashedSHA256(_appSettings.GenericPassword);
                dbusr = user;
            }
            else
            {
                dbusr.CopyFrom(user, x => new { x.AreaId, x.Email, x.FullName, x.RolId });
            }
            _db.SaveChanges();
            dbusr.Password = null;
            return new JsonResult(user);

        }

        [HttpGet("[action]")]
        public IActionResult Update(string username, bool active)
        {            
            var user = _db.Users.FirstOrDefault(x => x.Username == username);

            user.Active = active;

            _db.SaveChanges();

            return new JsonResult(new {
                user.Username, user.Email, user.FullName, user.RolId, user.AreaId, user.Active
            });
        }

    }
}
