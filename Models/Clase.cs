using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Clase
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int LevelClass { get; set; }

    public virtual ICollection<ClaseDetail> ClaseDetails { get; set; } = new List<ClaseDetail>();

    public virtual ICollection<ClientClass> ClientClasses { get; set; } = new List<ClientClass>();
}
