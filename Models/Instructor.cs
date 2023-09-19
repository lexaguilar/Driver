using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Instructor
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Observation { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<ClaseClient> ClaseClients { get; set; } = new List<ClaseClient>();

    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();
}
