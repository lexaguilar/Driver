﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Driver.Models
{
    public partial class Resource
    {
        public Resource()
        {
            RolResources = new HashSet<RolResource>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<RolResource> RolResources { get; set; }
    }
}
