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
    public class ReceiptsController : Controller
    {
        private DriverContext _db = null;
        public ReceiptsController(DriverContext db)
        {
            this._db = db;
        }


        [Route("api/receipts/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<VwReceipt> receipts = _db.VwReceipts;

            if (values.ContainsKey("registerId"))
            {
                var registerId = Convert.ToInt32(values["registerId"]);
                receipts = receipts.Where(x => x.RegisterId == registerId);
            }

            if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                receipts = receipts.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                receipts = receipts.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                receipts = receipts.Where(x => x.Name.Contains(name));
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                receipts = receipts.Where(x => x.Reference.Contains(reference));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                receipts = receipts.Where(x => x.Identification.Contains(identification));
            }

            var items = receipts.Skip(skip).Take(take);
            
            return Json(new
            {
                items,
                totalCount = receipts.Count()
            });

        }

        [HttpPost("api/receipts/post")]
        public IActionResult Post([FromBody] Receipt receipt)
        {
            var register = _db.Registers
            .Include(x => x.Receipts)
            .FirstOrDefault(x => x.Id == receipt.RegisterId);

            var oldReceipt = _db.Receipts.Include(x => x.Register)
            .FirstOrDefault(x => x.Reference == receipt.Reference);

            if (oldReceipt != null)
                return BadRequest($"El número de recibo {receipt.Reference} ya esta registrado en la matricula {oldReceipt.Register.Id}");

            if(receipt.Amount <= 0)
                return BadRequest($"Ingrese un monto mayor a 0 para generar recibo");
            
            if(register == null)
                return BadRequest($"No se encontro la matricula para generar recibo");

                
            if(!register.Active)
                return BadRequest($"La matricula {receipt.RegisterId} no esta activa");
            
                        
            var user = this.GetAppUser();

            decimal balance, abonado = 0;
            if(register.Receipts.Count() > 0) 
                abonado = register.Receipts.Where(x => x.Active).Sum(x => x.Amount);
            balance = register.Total - abonado - receipt.Amount;

            if(balance < 0)
                return BadRequest($"El monto del recibo sobre pasa la deuda");

         
            receipt.ClientId = register.ClientId;
            receipt.Balance = balance;
            receipt.Active = true;
            receipt.CreateAt = DateTime.Now;
            receipt.CreateBy = user.Username;

            _db.Receipts.Add(receipt);

            
            _db.SaveChanges();

            return Json(receipt);

        }


    }
}
