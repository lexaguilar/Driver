
using System.Linq;
using Driver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Driver.Controllers
{
    public class AboutController : Controller
    {
        private readonly DriverContext db = null;
        public AboutController(DriverContext _db)
        {
            this.db = _db;
        }

        [Route("api/about/get-info")]
        public IActionResult Get()
        {

            var app = db.Apps.FirstOrDefault();
            app.Version = Program.version.ToString();

            return Json(app);
        }

        [HttpPost("api/about/set-info")]
        public IActionResult SetInfo([FromBody]App app)
        {
            App oldApp = db.Apps.FirstOrDefault();

            if(oldApp==null)
                return BadRequest("Los valores iniciales de la aplicacion no estan establecidos");       

            oldApp.Price = app.Price;  
            oldApp.ProcessesInitDate = app.ProcessesInitDate;  

            db.SaveChanges();

            return Json(app);  
        }   

        [Authorize]
        [Route("api/about/info")]
        public IActionResult GetInfo()
        {

            App app = db.Apps.FirstOrDefault();                   

            return Json(new { id = app.Id});
            
        }

    }
}
