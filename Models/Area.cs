using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Area
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Checkup> Checkups { get; set; } = new List<Checkup>();

    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
