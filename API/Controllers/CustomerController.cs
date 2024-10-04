using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
using Service.DataTransferObjects;
using Service.Models;

namespace API.Controllers;

public class CustomerController(MyDbContext context) : ControllerBase
{
    private CustomerDAO dao = new CustomerDAO(context);

    [HttpGet]
    [Route("api/customers")]
    public ActionResult<List<Customer>> GetAllCustomers()
    {
        return dao.GetAllCustomers();
    }
    
    [HttpPost]
    [Route("api/customers")]
    public ActionResult<Customer> AddCustomer([FromBody] CreateCustomerDto custdto)
    {
        var cust = new Customer()
        {
            Name = custdto.Name,
            Address = custdto.Address,
            Email = custdto.Email,
            Phone = custdto.Phone
        };
        
        return dao.AddCustomer(cust);
    }
    
    [HttpPatch]
    [Route("api/customers")]
    public ActionResult<Customer> UpdateCustomer([FromBody] EditCustomerDto custdto)
    {
        var cust = new Customer()
        {
            Id = custdto.Id,
            Name = custdto.Name,
            Address = custdto.Address,
            Email = custdto.Email,
            Phone = custdto.Phone
        };
        
        return dao.UpdateCustomer(cust);
    }
    
    [HttpDelete]
    [Route("api/customers")]
    public void DeleteCustomer(int id)
    {
        dao.DeleteCustomer(id);
    }
    
    
    
    
}