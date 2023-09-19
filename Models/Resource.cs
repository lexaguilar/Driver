using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Resource
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public virtual ICollection<RolResource> RolResources { get; set; } = new List<RolResource>();
}
