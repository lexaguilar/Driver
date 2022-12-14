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


        
        [Route("api/receipts/get/pending/{checkupId}")]
        public IActionResult GetPending(int checkupId)
        {

            var app = _db.Apps.FirstOrDefault();
            var checkup = _db.Checkups.FirstOrDefault(x => x.Id == checkupId);
            IQueryable<VwReceipt> receipts = _db.VwReceipts.Where(x => x.AreaId == checkup.AreaId && !x.IsProcessed);
            
            receipts = receipts.Where(x => x.Date.Date >= checkup.DateInit.Date && x.Date.Date <= checkup.DateEnd.Date);

            if(app.ProcessesInitDate != null)
                receipts = receipts.Where(x => x.Date.Date >= app.ProcessesInitDate.Value.Date); 

            return Json(receipts);

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

            var checkupClosed = _db.Checkups.FirstOrDefault(x => x.DateInit <= receipt.Date && x.DateEnd >=  receipt.Date && x.IsClosed);
            if(checkupClosed != null)
                return BadRequest($"No se puede agregar un recibo con la fecha {receipt.Date} ya que ese periodo está cerrado por el arqueo {checkupClosed.Id}");
                        
            var user = this.GetAppUser();

            decimal balance=0, abonado = 0;
            if(register.Receipts.Where(x => x.IsMainPayment).Count() > 0) 
                abonado = register.Receipts.Where(x => x.Active && x.IsMainPayment).Sum(x => x.Amount);

            if(receipt.IsMainPayment)
                balance = register.Total - abonado - receipt.Amount;
            else
                balance = register.Total - abonado;

            if(balance < 0)
                return BadRequest($"El monto del recibo sobre pasa la deuda");

         
            receipt.ClientId = register.ClientId;
            receipt.Balance = balance;
            receipt.Active = true;
            receipt.CreateAt = DateTime.Now;
            receipt.CreateBy = user.Username;

            register.Payoff = balance == 0;

            _db.Receipts.Add(receipt);

            
            _db.SaveChanges();

            return Json(receipt);

        }


    }
}
