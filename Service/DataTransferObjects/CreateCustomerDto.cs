using System;
using System.Collections.Generic;

namespace Service.Models;

public partial class CreateCustomerDto
{

    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

}