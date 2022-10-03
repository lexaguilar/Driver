using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Concept
    {
        public Concept()
        {
            Receipts = new HashSet<Receipt>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
