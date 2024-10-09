using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Service.Models;

public partial class CreateCustomerDto
{

    [MinLength(2, ErrorMessage = "name must be 2 characters or more")]
    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Phone { get; set; }

    [EmailAddress(ErrorMessage = "Invalid Email, must contain @ and a dot")]
    public string? Email { get; set; }

}