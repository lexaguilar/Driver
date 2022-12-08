using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Driver.Models;

namespace Driver.ViewModel
{  

    public class RegisterRequest
    {
        public int Id  { get; set; }
        public int Age  { get; set; }
        public decimal Balance  { get; set; }     
        public decimal Discount  { get; set; }
        public string Identification  { get; set; }
        public decimal InitBalance  { get; set; }
        public int InstructorId  { get; set; }
        public int TypeLicenceId  { get; set; }
        public int[] categories  { get; set; }
        public string Name  { get; set; }
        public string Observation  { get; set; }
        public string PhoneNumber  { get; set; }
        public string Reference  { get; set; }
        public decimal Price  { get; set; }
        public DateTime StartDate  { get; set; }
        public decimal SubTotal  { get; set; }
        public decimal Total  { get; set; }
        public int? PaymentTypeId  { get; set; }
        public int? ConceptId  { get; set; }


    }

}