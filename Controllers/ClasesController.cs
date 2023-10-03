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
    public class ClasesController : Controller
    {
        private DriverContext _db = null;
        public ClasesController(DriverContext db)
        {
            this._db = db;
        }


        [Route("api/clases/client/{clientId}/get")]
        public IActionResult Get(int clientId)
        {

            var result = _db.VwClasesClients.Where(x => x.ClientId == clientId).ToList();

            return Json(result);

        }

        [Route("api/clases/client/{clientId}/get/class/{classId}")]
        public IActionResult Get(int clientId, int classId)
        {

            var detail = _db.ClaseDetails.Where(x => x.ClaseId == classId);
            var classDoit = _db.ClientClasses.Include(x => x.ClientClassQuestions)
            .FirstOrDefault(x => x.ClaseId == classId && x.ClientId == clientId);


            return Json(new { detail, classDoit });

        }

        [HttpPost("api/clases/post")]
        public IActionResult Post([FromBody] ClientClass clientClass)
        {

            var user = this.GetAppUser();

            if(user.InstructorId == 0)
                return BadRequest("El usuario no tiene instructor asignado");

            var currentClaseClient = _db.ClientClasses.FirstOrDefault(x => x.Id == clientClass.Id);

            if (currentClaseClient == null)
            {
                
                clientClass.CreateAt = DateTime.Now;
                clientClass.CreateBy = user.Username;
                clientClass.InstructorId = user.InstructorId;               
               
                _db.ClientClasses.Add(clientClass);
                _db.SaveChanges();

            }else{                
                
                var classClientQuestions = _db.ClientClassQuestions.Where(x => x.ClientClassId == currentClaseClient.Id);                
                _db.ClientClassQuestions.RemoveRange(classClientQuestions);

                foreach (var item in clientClass.ClientClassQuestions)
                {
                    var newItem = new ClientClassQuestion{
                        ClientClassId = currentClaseClient.Id,
                        ClaseQuestionId = item.ClaseQuestionId,
                        Evaluation = item.Evaluation,                
                    };

                    _db.ClientClassQuestions.Add(newItem);
                }

                _db.SaveChanges();

            }

            return Json(clientClass);


        }

    }
}
