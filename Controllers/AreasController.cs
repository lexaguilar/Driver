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
    public class AreasController : Controller
    {      
        private DriverContext _db = null;
        public AreasController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/areas/get")]
        public IActionResult Get(bool active){

            IQueryable<Area> areas = _db.Areas;
            if(active)
                return Json(areas.Where(x => x.Active));
            
            return Json(areas);
            
        } 

        [HttpPost("api/areas/post")]
        public IActionResult Post([FromBody] Area area)
        {
            area.ToUpperCase(); 
            
            if(area.Id > 0){

                _db.Areas.Attach(area);
                _db.Entry(area).State = EntityState.Modified;

            }else{

                _db.Areas.Add(area);

            }
            _db.SaveChanges();

            return Json(area);

        }
      
        [HttpGet("api/areas/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.Areas.FirstOrDefault(x => x.Id ==  id);
            model.Active = false;
            _db.SaveChanges();
            
            return Json(new { n = id});

        }
    
    }
}
