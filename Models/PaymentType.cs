﻿using System;
using System.Collections.Generic;

namespace Driver.Models;

public partial class PaymentType
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }
}
