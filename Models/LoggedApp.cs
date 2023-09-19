using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class LoggedApp
{
    public string Name { get; set; }

    public string UrlRequest { get; set; }

    public string Ip { get; set; }

    public DateTime? LoggedAt { get; set; }

    public int Id { get; set; }
}
