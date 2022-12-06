using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Checkup
    {
        public Checkup()
        {
            Discharges = new HashSet<Discharge>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateInit { get; set; }
        public DateTime DateEnd { get; set; }
        public decimal Rate { get; set; }
        public decimal TotalIn { get; set; }
        public decimal TotalOut { get; set; }
        public decimal Balance { get; set; }
        public bool IsClosed { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime ModifyAt { get; set; }
        public string ModifyBy { get; set; }
        public int AreaId { get; set; }

        public virtual ICollection<Discharge> Discharges { get; set; }
        public virtual Area Area { get; set; }
    }
}
