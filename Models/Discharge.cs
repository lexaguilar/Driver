using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Discharge
    {
        public int Id { get; set; }
        public int DischargeTypeId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual DischargeType DischargeType { get; set; }
    }
}
