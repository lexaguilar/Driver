using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class App
{
    public int Id { get; set; }

    public decimal Price { get; set; }

    public string Name { get; set; }

    public string Version { get; set; }

    public DateTime? ProcessesInitDate { get; set; }
}
