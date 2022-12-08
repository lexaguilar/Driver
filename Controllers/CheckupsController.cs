using System;
using System.Collections.Generic;
using System.Linq;
using Driver.Extensions;
using Driver.Factory;
using Driver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Driver.Controllers
{  
    [Authorize]
    public class CheckupsController : Controller
    {      
        private DriverContext _db = null;
        public CheckupsController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/checkups/get/{id}")]
        public IActionResult Get(int id){

            var checkup = _db.Checkups.Include(x => x.Area).FirstOrDefault(x => x.Id == id);           
            
            return Json(checkup);
            
        } 

        [Route("api/checkups/get")]
        public IActionResult Get(){

            var user = this.GetAppUser(); 

            IQueryable<Checkup> checkups = _db.Checkups.Where(x => x.AreaId == user.AreaId);           
            
            return Json(checkups);
            
        } 

        [HttpPost("api/checkups/post")]
        public IActionResult Post([FromBody] Checkup checkup)
        {        

            var user = this.GetAppUser();
            
            if(checkup.Id > 0){

                checkup.ModifyAt = DateTime.Now;
                checkup.ModifyBy = user.Username;
                
                _db.Checkups.Attach(checkup);
                _db.Entry(checkup).State = EntityState.Modified;

            }else{

                // var existCheckupOpen = _db.Checkups.Any(x => !x.IsClosed);

                // if(existCheckupOpen)
                //     return BadRequest($"No se puede crear un nuevo arqueo ya que existen otros que aun no se han cerrado");

                checkup.CreateAt = DateTime.Now;
                checkup.CreateBy = user.Username;

                checkup.ModifyAt = DateTime.Now;
                checkup.ModifyBy = user.Username;

                checkup.AreaId = user.AreaId;

                checkup.TotalIn = 0;
                checkup.TotalOut = 0;
                checkup.Balance = 0;

                _db.Checkups.Add(checkup);

            }
            _db.SaveChanges();

            return Json(checkup);

        }
    
    }
}
