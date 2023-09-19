using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class Client
{
    public int Id { get; set; }

    public string Identification { get; set; }

    public string Name { get; set; }

    public string SexId { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public string CelularNumber { get; set; }

    public DateTime CreateAt { get; set; }

    public string CreateBy { get; set; }

    public DateTime ModifyAt { get; set; }

    public string ModifyBy { get; set; }

    public int? Age { get; set; }

    public virtual ICollection<ClaseClient> ClaseClients { get; set; } = new List<ClaseClient>();

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();

    public virtual ICollection<Register> Registers { get; set; } = new List<Register>();
}
