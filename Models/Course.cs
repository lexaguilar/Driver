using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Course
    {
        public Course()
        {
            Registers = new HashSet<Register>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Register> Registers { get; set; }
    }
}
