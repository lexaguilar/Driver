using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class DischargeType
    {
        public DischargeType()
        {
            Discharges = new HashSet<Discharge>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public virtual ICollection<Discharge> Discharges { get; set; }
    }
}
