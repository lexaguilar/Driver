using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Register
    {
        public Register()
        {
            Receipts = new HashSet<Receipt>();
        }

        public int Id { get; set; }
        public int AreaId { get; set; }
        public int ClientId { get; set; }
        public string Categories { get; set; }
        public int TypeLicenceId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public bool Payoff { get; set; }
        public DateTime StartDate { get; set; }
        public int InstructorId { get; set; }
        public string Observation { get; set; }
        public DateTime? EndDate { get; set; }
        public double? NoteTheoretical { get; set; }
        public double? NotePractice { get; set; }
        public DateTime? DateTheoretical { get; set; }
        public DateTime? DatePractice { get; set; }
        public string Acta { get; set; }
        public string Folio { get; set; }
        public string Book { get; set; }
        public int? ActaYear { get; set; }
        public bool Active { get; set; }
        public string MotiveCancel { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime ModifyAt { get; set; }
        public string ModifyBy { get; set; }
        public int Code { get; set; }

        public virtual Area Area { get; set; }
        public virtual Client Client { get; set; }
        public virtual Instructor Instructor { get; set; }
        public virtual TypeLicence TypeLicence { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
