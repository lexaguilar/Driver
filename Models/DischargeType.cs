using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class DischargeType
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Discharge> Discharges { get; set; } = new List<Discharge>();
}
