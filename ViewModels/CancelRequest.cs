using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Driver.Models;

namespace Driver.ViewModel
{

    public class CancelRequest
    {
        public int Id { get; set; }
        public string MotiveCancel { get; set; }

    }

    public class UpdateRequest
    {
        public int Id { get; set; }
        public string Observation { get; set; }

    }

}