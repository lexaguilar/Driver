using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Clase
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<ClaseDetail> ClaseDetails { get; set; } = new List<ClaseDetail>();
}
