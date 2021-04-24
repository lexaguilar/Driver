using System;
using Microsoft.AspNetCore.Mvc;
using Driver.Factory;
using Driver.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Driver.Controllers
{
    //[Authorize]  
    [Route("api/catalogos")]
    public class CatalogosController : Controller
    {      
        private readonly DriverContext db;
        public CatalogosController(DriverContext _db){
            db = _db;
        }

        [Route("{name}")]
        public IActionResult GenericsCatalogs(string name){

            var catalogoFactory = new CatalogoFactory(db);
            return Json(catalogoFactory.GetAll(name));            

        }      
        

        
    }
}
