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
    public class ClientsController : Controller
    {
        private DriverContext _db = null;
        public ClientsController(DriverContext db)
        {
            this._db = db;
        }


        [Route("api/clients/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<Client> clients = _db.Clients;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                clients = clients.Where(x => x.Name.Contains(name));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                clients = clients.Where(x => x.Identification.Contains(identification));
            }

            var items = clients.Skip(skip).Take(take);
            
            return Json(new
            {
                items,
                totalCount = clients.Count()
            });

        }

        [HttpPost("api/clients/post")]
        public IActionResult Post([FromBody] Client client)
        {
            var user = this.GetAppUser();

            client.ToUpperCase();

            client.ModifyAt = DateTime.Now;
            client.ModifyBy = user.Username;
            client.SexId = "M";

            if (client.Id > 0)
            {

                _db.Clients.Attach(client);
                _db.Entry(client).State = EntityState.Modified;

            }
            else
            {

                client.CreateAt = DateTime.Now;
                client.CreateBy = user.Username;

                _db.Clients.Add(client);

            }
            _db.SaveChanges();

            return Json(client);

        }


    }
}
