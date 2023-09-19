using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Rate
{
    public DateTime Date { get; set; }

    public decimal Value { get; set; }

    public DateTime CreateAt { get; set; }
}
