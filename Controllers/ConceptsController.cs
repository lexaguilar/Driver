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
    public class ConceptsController : Controller
    {      
        private DriverContext _db = null;
        public ConceptsController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/concepts/get")]
        public IActionResult Get(bool active){

            IQueryable<Concept> concepts = _db.Concepts;
            if(active)
                return Json(concepts.Where(x => x.Active));
            
            return Json(concepts);
            
        } 

        [HttpPost("api/concepts/post")]
        public IActionResult Post([FromBody] Concept concept)
        {
            concept.ToUpperCase(); 
            
            if(concept.Id > 0){

                _db.Concepts.Attach(concept);
                _db.Entry(concept).State = EntityState.Modified;

            }else{

                _db.Concepts.Add(concept);

            }
            _db.SaveChanges();

            return Json(concept);

        }
      
        [HttpGet("api/concepts/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.Concepts.FirstOrDefault(x => x.Id ==  id);
            model.Active = false;
            _db.SaveChanges();
            
            return Json(new { n = id});

        }
    
    }
}
