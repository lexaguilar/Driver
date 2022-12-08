using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Receipt
    {
        public int Id { get; set; }
        public int RegisterId { get; set; }
        public int ClientId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public decimal Balance { get; set; }
        public string Reference { get; set; }
        public bool Active { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int? PaymentTypeId { get; set; }
        public bool IsProcessed { get; set; }
        public bool ConceptId5 { get; set; }
        public int? ConceptId { get; set; }

        public virtual Client Client { get; set; }
        public virtual Concept Concept { get; set; }
        public virtual PaymentType PaymentType { get; set; }
        public virtual Register Register { get; set; }
    }
}
