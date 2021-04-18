using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Client
    {
        public Client()
        {
            Receipts = new HashSet<Receipt>();
            Registers = new HashSet<Register>();
        }

        public int Id { get; set; }
        public string Identification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SexId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CelularNumber { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual ICollection<Receipt> Receipts { get; set; }
        public virtual ICollection<Register> Registers { get; set; }
    }
}
