using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Instructor
    {
        public Instructor()
        {
            Registers = new HashSet<Register>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Observation { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Register> Registers { get; set; }
    }
}
