using System;
using System.Collections.Generic;
using System.Linq;
using Driver.Factory;
using Driver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Driver.Controllers
{  
    [Authorize]
    public class DischargeTypesController : Controller
    {      
        private DriverContext _db = null;
        public DischargeTypesController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/DischargeTypes/get")]
        public IActionResult Get(bool active){

            IQueryable<DischargeType> areas = _db.DischargeTypes;
            if(active)
                return Json(areas.Where(x => x.Active));
            
            return Json(areas);
            
        } 

        [HttpPost("api/DischargeTypes/post")]
        public IActionResult Post([FromBody] DischargeType dischargeType)
        {
            dischargeType.ToUpperCase(); 
            
            if(dischargeType.Id > 0){

                _db.DischargeTypes.Attach(dischargeType);
                _db.Entry(dischargeType).State = EntityState.Modified;

            }else{

                _db.DischargeTypes.Add(dischargeType);

            }
            _db.SaveChanges();

            return Json(dischargeType);

        }
      
        [HttpGet("api/DischargeTypes/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.DischargeTypes.FirstOrDefault(x => x.Id ==  id);
            model.Active = false;
            _db.SaveChanges();
            
            return Json(new { n = id});

        }
    
    }
}
