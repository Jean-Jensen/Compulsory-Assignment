using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
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
    public ActionResult<Customer> AddCustomer([FromBody] Customer cust)
    {
        return dao.AddCustomer(cust);
    }
    
    [HttpPatch]
    [Route("api/customers")]
    public ActionResult<Customer> UpdateCustomer([FromBody] Customer cust)
    {
        return dao.UpdateCustomer(cust);
    }
    
    [HttpDelete]
    [Route("api/customers")]
    public void DeleteCustomer(int id)
    {
        dao.DeleteCustomer(id);
    }
    
    
    
    
}