using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Concept
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();
}
