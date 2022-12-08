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
    public class PaymentTypesController : Controller
    {      
        private DriverContext _db = null;
        public PaymentTypesController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/PaymentTypes/get")]
        public IActionResult Get(bool active){

            IQueryable<PaymentType> areas = _db.PaymentTypes;
            if(active)
                return Json(areas.Where(x => x.Active));
            
            return Json(areas);
            
        } 

        [HttpPost("api/PaymentTypes/post")]
        public IActionResult Post([FromBody] PaymentType paymentType)
        {
            paymentType.ToUpperCase(); 
            
            if(paymentType.Id > 0){

                _db.PaymentTypes.Attach(paymentType);
                _db.Entry(paymentType).State = EntityState.Modified;

            }else{

                _db.PaymentTypes.Add(paymentType);

            }
            _db.SaveChanges();

            return Json(paymentType);

        }
      
        [HttpGet("api/PaymentTypes/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.DischargeTypes.FirstOrDefault(x => x.Id ==  id);
            model.Active = false;
            _db.SaveChanges();
            
            return Json(new { n = id});

        }
    
    }
}
