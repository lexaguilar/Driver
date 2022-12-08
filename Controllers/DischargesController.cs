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
    public class DischargesController : Controller
    {      
        private DriverContext _db = null;
        public DischargesController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/Discharges/get/id/{checkupId}")]
        public IActionResult Get(int checkupId){

            var discharges = _db.Discharges.Where(x => x.CheckupId == checkupId).ToArray();
            
            return Json(discharges);
            
        } 

        [Route("api/Discharges/getbyid/{id}")]
        public IActionResult GetById(int id){

            var discharges = _db.Discharges.Where(x => x.Id == id).ToArray();
            
            return Json(discharges);
            
        } 

        [HttpPost("api/Discharges/post")]
        public IActionResult Post([FromBody] Discharge discharge)
        {

            var user = this.GetAppUser();
            
            if(discharge.Id > 0){

                _db.Discharges.Attach(discharge);
                _db.Entry(discharge).State = EntityState.Modified;

            }else{
                discharge.CreateAt = DateTime.Now;
                discharge.CreateBy = user.Username;
                _db.Discharges.Add(discharge);

            }
            _db.SaveChanges();

            return Json(discharge);

        }
      
        [HttpGet("api/Discharges/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.Discharges.FirstOrDefault(x => x.Id ==  id);
            _db.Discharges.Remove(model);
            _db.SaveChanges();
            
            return Json(new { n = id});

        }
    
    }
}
