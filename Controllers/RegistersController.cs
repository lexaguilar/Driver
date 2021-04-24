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


        [Route("api/registers/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<VwRegister> registers = _db.VwRegisters.OrderByDescending(x => x.Id);

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                registers = registers.Where(x => x.Name.Contains(name));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                registers = registers.Where(x => x.Identification.Contains(identification));
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

            if(register.InitBalance >= 0 && string.IsNullOrEmpty(register.Reference)){
                return BadRequest($"Debe de indicar el número de recibo cuando se ingresa un abono a la matricula");
            }

            if(register.InitBalance == 0 && !string.IsNullOrEmpty(register.Reference)){
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


    }
}
