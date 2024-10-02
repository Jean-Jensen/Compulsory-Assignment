using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
using Service.DataTransferObjects;
using Service.Models;

namespace API.Controllers;

public class PropertyController(MyDbContext context) : ControllerBase
{

    private PropertyDAO dao = new PropertyDAO(context);
    
    [HttpGet]
    [Route("api/property")]
    public ActionResult<List<Property>> GetAllProperties()
    {
        return Ok(dao.GetAllProperties());
    }
    
    [HttpPost]
    [Route("api/property")]
    public ActionResult<Property> AddProperty([FromBody] CreatePropertyDto p)
    {
        Property prop = new Property()
        {
            Id = p.Id,
            PropertyName = p.PropertyName
        };
        
        return Ok(dao.AddProperty(prop));
    }
    
}