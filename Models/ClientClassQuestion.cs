using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class ClientClassQuestion
{
    public int Id { get; set; }

    public int ClientClassId { get; set; }

    public int ClaseQuestionId { get; set; }

    public decimal Evaluation { get; set; }

    public virtual ClaseDetail ClaseQuestion { get; set; }

    public virtual ClientClass ClientClass { get; set; }
}
