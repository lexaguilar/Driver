using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class ClaseDetail
{
    public int Id { get; set; }

    public int ClaseId { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }

    public int? Peso { get; set; }

    public int ClassOrder { get; set; }

    public virtual Clase Clase { get; set; }

    public virtual ICollection<ClientClassQuestion> ClientClassQuestions { get; set; } = new List<ClientClassQuestion>();
}
