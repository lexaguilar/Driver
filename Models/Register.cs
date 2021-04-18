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
        public int CourseId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public decimal Total { get; set; }
        public bool Payoff { get; set; }

        public virtual Area Area { get; set; }
        public virtual Client Client { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
