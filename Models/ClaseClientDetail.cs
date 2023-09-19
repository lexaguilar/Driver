using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class ClaseClientDetail
{
    public int Id { get; set; }

    public DateTime ClassDateTime { get; set; }

    public byte[] ClientSign { get; set; }

    public int ClaseClientId { get; set; }

    public int ClaseDetailId { get; set; }

    public double Evaluation { get; set; }

    public string Observation { get; set; }

    public DateTime CreatedAt { get; set; }

    public string CreateBy { get; set; }

    public virtual ClaseDetail ClaseDetail { get; set; }
}
