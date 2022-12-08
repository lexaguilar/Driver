using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class VwRegister
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public string Sucursal { get; set; }
        public int AreaId { get; set; }
        public int ClientId { get; set; }
        public string Identification { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double? NotePractice { get; set; }
        public double? NoteTheoretical { get; set; }
        public string Folio { get; set; }
        public string Book { get; set; }
        public int TypeLicenceId { get; set; }
        public decimal Discount { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public bool Payoff { get; set; }
        public decimal Abonos { get; set; }
        public int InstructorId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime ModifyAt { get; set; }
        public string ModifyBy { get; set; }
        public string Categories { get; set; }
        public bool Active { get; set; }
        public decimal? Balance { get; set; }
    }
}
