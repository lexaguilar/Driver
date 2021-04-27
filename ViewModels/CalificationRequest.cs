using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Driver.Models;

namespace Driver.ViewModel
{

    public class CalificationRequest
    {
        public int Id { get; set; }
        public DateTime? EndDate { get; set; }
        public double? NoteTheoretical { get; set; }
        public double? NotePractice { get; set; }
        public DateTime? DateTheoretical { get; set; }
        public DateTime? DatePractice { get; set; }
        public string Acta { get; set; }
        public string Folio { get; set; }
        public string Book { get; set; }
        public int? ActaYear { get; set; }
        public bool ApplyPay { get; set; }
        public decimal Amount { get; set; }
        public string Reference { get; set; }


    }

}