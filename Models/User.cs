using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class User
{
    public string Username { get; set; }

    public string FullName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public int RolId { get; set; }

    public int AreaId { get; set; }

    public bool Active { get; set; }

    public int? InstructorId { get; set; }

    public virtual Area Area { get; set; }

    public virtual Rol Rol { get; set; }
}
