using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class TypeLicence
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();
}
