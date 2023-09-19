using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Rol
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<RolResource> RolResources { get; set; } = new List<RolResource>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
