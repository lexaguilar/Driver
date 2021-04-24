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
    public class InstructorsController : Controller
    {
        private DriverContext _db = null;
        public InstructorsController(DriverContext db)
        {
            this._db = db;
        }


        [Route("api/instructors/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<Instructor> instructors = _db.Instructors;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                instructors = instructors.Where(x => x.Name.Contains(name));
            }

            var items = instructors.Skip(skip).Take(take);
            
            return Json(new
            {
                items,
                totalCount = instructors.Count()
            });

        }

        [HttpPost("api/instructors/post")]
        public IActionResult Post([FromBody] Instructor instructor)
        {
            var user = this.GetAppUser();

            instructor.ToUpperCase();

            if (instructor.Id > 0)
            {

                _db.Instructors.Attach(instructor);
                _db.Entry(instructor).State = EntityState.Modified;

            }
            else
            {

                _db.Instructors.Add(instructor);

            }
            _db.SaveChanges();

            return Json(instructor);

        }

        [HttpGet("api/instructors/{id}/delete")]
         public IActionResult Delete(int id) {

            var model = _db.Instructors.FirstOrDefault(x => x.Id ==  id);
            model.Active = false;
            _db.SaveChanges();
            
            return Json(new { n = id});

        }


    }
}
