using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Area
    {
        public Area()
        {
            Registers = new HashSet<Register>();
            Users = new HashSet<User>();
            Checkups = new HashSet<Checkup>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Register> Registers { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Checkup> Checkups { get; set; }
    }
}
