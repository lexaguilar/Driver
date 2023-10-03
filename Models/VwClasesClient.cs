using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class VwClasesClient
{
    public string ClientName { get; set; }

    public int ClassId { get; set; }

    public string Clase { get; set; }

    public int ClientId { get; set; }

    public int? HasClass { get; set; }
}
