using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class ClaseClient
{
    public int Id { get; set; }

    public int ClientId { get; set; }

    public int InstructorId { get; set; }

    public virtual Client Client { get; set; }

    public virtual Instructor Instructor { get; set; }
}
