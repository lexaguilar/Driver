using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class TypeLicence
    {
        public TypeLicence()
        {
            Registers = new HashSet<Register>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Register> Registers { get; set; }
    }
}
