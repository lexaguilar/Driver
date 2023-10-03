using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class ClientClass
{
    public int Id { get; set; }

    public int ClientId { get; set; }

    public int InstructorId { get; set; }

    public int ClaseId { get; set; }

    public string Observation { get; set; }

    public DateTime ClassDateTime { get; set; }

    public string SignatureClient { get; set; }

    public DateTime CreateAt { get; set; }

    public string CreateBy { get; set; }

    public virtual Clase Clase { get; set; }

    public virtual Client Client { get; set; }

    public virtual ICollection<ClientClassQuestion> ClientClassQuestions { get; set; } = new List<ClientClassQuestion>();

    public virtual Instructor Instructor { get; set; }
}
