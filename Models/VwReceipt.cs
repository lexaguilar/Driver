using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class VwReceipt
    {
        public int Id { get; set; }
        public string Identification { get; set; }
        public string Name { get; set; }
        public string Reference { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public decimal Balance { get; set; }
        public decimal Total { get; set; }
        public bool Active { get; set; }
        public int AreaId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Observation { get; set; }
        public int RegisterId { get; set; }
        public bool IsProcessed { get; set; }
        public bool IsMainPayment { get; set; }
        public string PaymentType { get; set; }
        public string Concept { get; set; }
        public decimal Efectivo { get; set; }
        public decimal Tarjeta { get; set; }
        public decimal Transferencia { get; set; }
    }
}
