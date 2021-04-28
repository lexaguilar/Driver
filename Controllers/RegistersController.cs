using System;
using System.Collections.Generic;
using System.Linq;
using Driver.Extensions;
using Driver.Factory;
using Driver.Models;
using Driver.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Driver.Controllers
{
    [Authorize]
    public class RegistersController : Controller
    {
        private DriverContext _db = null;
        public RegistersController(DriverContext db)
        {
            this._db = db;
        }

        [Route("api/registers/get/{id}")]
        public IActionResult Get(int id)
        {
            var register = _db.Registers
            .Include(x => x.Client)
            .Include(x => x.TypeLicence)
            .Include(x => x.Receipts)
            .Include(x => x.Instructor)
            .FirstOrDefault(x => x.Id == id);
            
            return Json(register);


        }

        [Route("api/registers/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<VwRegister> registers = _db.VwRegisters.OrderByDescending(x => x.Id);

            if (values.ContainsKey("active"))
            {
                var active = Convert.ToBoolean(values["active"]);
                if(active)
                    registers = registers.Where(x => x.Active);
            }

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                registers = registers.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                registers = registers.Where(x => x.Name.StartsWith(name));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                registers = registers.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                registers = registers.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("typeLicenceId"))
            {
                var typeLicenceId = Convert.ToInt32(values["typeLicenceId"]);
                registers = registers.Where(x => x.TypeLicenceId == typeLicenceId);
            }

            if (values.ContainsKey("startDate"))
            {
                var startDate = Convert.ToDateTime(values["startDate"]);
                registers = registers.Where(x => x.StartDate == startDate);
            }

            if (values.ContainsKey("payoff"))
            {
                var payoff = Convert.ToBoolean(values["payoff"]);
                registers = registers.Where(x => x.Payoff == payoff);
            }

            if (values.ContainsKey("instructorId"))
            {
                var instructorId = Convert.ToInt32(values["instructorId"]);
                registers = registers.Where(x => x.InstructorId == instructorId);
            }

            if (values.ContainsKey("createBy"))
            {
                var createBy = Convert.ToString(values["createBy"]);
                registers = registers.Where(x => x.CreateBy == createBy);
            }


            var items = registers.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = registers.Count()
            });


        }

        [HttpPost("api/registers/post")]
        public IActionResult Post([FromBody] RegisterRequest register)
        {
            var oldReceipt = _db.Receipts.Include(x => x.Register)
            .FirstOrDefault(x => x.Reference == register.Reference);

            if (oldReceipt != null)
                return BadRequest($"El número de recibo {register.Reference} ya esta registrado en la matricula {oldReceipt.Register.Id}");

            if (register.InitBalance > 0 && string.IsNullOrEmpty(register.Reference))
            {
                return BadRequest($"Debe de indicar el número de recibo cuando se ingresa un abono a la matricula");
            }

            if (register.InitBalance == 0 && !string.IsNullOrEmpty(register.Reference))
            {
                return BadRequest($"Quite el número de recibo cuando el abono sea 0 para poder continuar");
            }

            var user = this.GetAppUser();

            if (register.Id == 0)
            {
                var client = _db.Clients.FirstOrDefault(x => x.Identification == register.Identification);

                if (client == null)
                {
                    client = new Client
                    {
                        Name = register.Name,
                        Identification = register.Identification,
                        SexId = "M",
                        Address = register.Address,
                        PhoneNumber = register.PhoneNumber,

                        ModifyAt = DateTime.Now,
                        ModifyBy = user.Username,
                        CreateAt = DateTime.Now,
                        CreateBy = user.Username
                    };
                }

                client.ToUpperCase();

                var newRegister = new Register
                {
                    AreaId = user.AreaId,
                    Client = client,
                    SubTotal = register.SubTotal,
                    Discount = register.Discount,
                    Total = register.Total,
                    Payoff = register.Total == register.InitBalance,
                    StartDate = register.StartDate,
                    InstructorId = register.InstructorId,
                    Observation = register.Observation,

                    Categories = string.Join(",", register.categories.OrderBy(x => x)),
                    TypeLicenceId = register.TypeLicenceId,

                    Active = true,

                    ModifyAt = DateTime.Now,
                    ModifyBy = user.Username,
                    CreateAt = DateTime.Now,
                    CreateBy = user.Username
                };



                if (register.InitBalance > 0)
                {

                    var newReceipt = new Receipt
                    {

                        Register = newRegister,
                        Client = client,
                        Amount = register.InitBalance,
                        Balance = register.Total - register.InitBalance,
                        Reference = register.Reference,
                        Active = true,
                        Observation = "",
                        Date = DateTime.Today,
                        CreateAt = DateTime.Now,
                        CreateBy = user.Username

                    };

                    newRegister.Receipts.Add(newReceipt);

                }

                _db.Registers.Add(newRegister);
                _db.SaveChanges();

            }

            return Json(register);

        }

        [HttpPost("api/registers/put")]
        public IActionResult Put([FromBody] CalificationRequest register)
        {


            var oldReceipt = _db.Receipts.Include(x => x.Register)
              .FirstOrDefault(x => x.Reference == register.Reference);

            if (oldReceipt != null)
                return BadRequest($"El número de recibo {register.Reference} ya esta registrado en la matricula {oldReceipt.Register.Id}");

            if (register.ApplyPay && string.IsNullOrEmpty(register.Reference))
                return BadRequest($"Debe de indicar el número de recibo cuando marque la opción de aplicar pago");

            if (register.ApplyPay && register.Amount == 0)
                return BadRequest($"Debe de indicar el monto cuando marque la opción de aplicar pago");


            var oldRegister = _db.Registers.Include(x => x.Receipts).FirstOrDefault(x => x.Id == register.Id);

            if (oldRegister == null)
                return BadRequest($"No se encontro la matricula con codigo {register.Id}");

            if (!oldRegister.Active)
                return BadRequest($"La matricula seleccionada({register.Id}) no esta activa");


            var user = this.GetAppUser();

            oldRegister.EndDate = register.EndDate;
            oldRegister.NoteTheoretical = register.NoteTheoretical;
            oldRegister.NotePractice = register.NotePractice;
            oldRegister.DateTheoretical = register.DateTheoretical;
            oldRegister.DatePractice = register.DatePractice;
            oldRegister.Acta = register.Acta;
            oldRegister.Folio = register.Folio;
            oldRegister.Book = register.Book;
            oldRegister.ActaYear = register.ActaYear;


            oldRegister.ModifyAt = DateTime.Now;
            oldRegister.ModifyBy = user.Username;

            var client = _db.Clients.FirstOrDefault(x => x.Id == oldRegister.ClientId);

            if (register.ApplyPay)
            {

                var amount = oldRegister.Receipts.Sum(x => x.Amount);

                var newReceipt = new Receipt
                {

                    Register = oldRegister,
                    Client = client,
                    Amount = register.Amount,
                    Balance = oldRegister.Total - (amount + register.Amount),
                    Reference = register.Reference,
                    Active = true,
                    Observation = "Pago completado",
                    Date = DateTime.Today,
                    CreateAt = DateTime.Now,
                    CreateBy = user.Username

                };

                oldRegister.Payoff = oldRegister.Total == (amount + register.Amount);

                oldRegister.Receipts.Add(newReceipt);

            }

            _db.SaveChanges();

            return Json(register);

        }

        [HttpPost("api/registers/updateinfo")]
        public IActionResult UpdateInfo([FromBody] UpdateRequest register)
        {

            var model = _db.Registers.FirstOrDefault(x => x.Id == register.Id);

            var user = this.GetAppUser();
          
            model.Observation = register.Observation;
            model.ModifyAt = DateTime.Now;
            model.ModifyBy = user.Username;

            _db.SaveChanges();

            return Json(register);

        }

        [HttpPost("api/registers/{id}/delete")]
        public IActionResult Delete([FromBody] CancelRequest register)
        {

            var model = _db.Registers.FirstOrDefault(x => x.Id == register.Id);

            var user = this.GetAppUser();

            model.Active = false;
            model.MotiveCancel = register.MotiveCancel;
            model.ModifyAt = DateTime.Now;
            model.ModifyBy = user.Username;

            _db.SaveChanges();

            return Json(register);

        }

    }
}
