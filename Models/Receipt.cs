using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Receipt
    {
        public int Id { get; set; }
        public int RegisterId { get; set; }
        public int ClientId { get; set; }
        public decimal Amount { get; set; }
        public decimal Balance { get; set; }
        public bool Active { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Client Client { get; set; }
        public virtual Register Register { get; set; }
    }
}
