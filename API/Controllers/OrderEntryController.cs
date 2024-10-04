using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
using Service.DataTransferObjects;
using Service.Models;

namespace API.Controllers;

public class OrderEntryController(MyDbContext context) : ControllerBase
{
    private OrderEntryDAO dao = new OrderEntryDAO(context);

    [HttpGet]
    [Route("api/orderEntry")]
    public ActionResult<List<OrderEntry>> GetOrderEntries()
    {
        return Ok(dao.GetAllOrders());
    }

    [HttpPost]
    [Route("api/orderEntry")]
    public ActionResult<OrderEntry> AddOrderEntry([FromBody] OrderEntryDto dto)
    {
        OrderEntry orderE = new OrderEntry()
        {
            Quantity = dto.Quantity,
            OrderId = dto.OrderId,
            ProductId = dto.ProductId
        };
        return Ok(dao.AddOrder(orderE));
    }

    [HttpPatch]
    [Route("api/orderEntry")]
    public ActionResult<OrderEntry> UpdateOrderEntry([FromBody] OrderEntryDto dto)
    {
        OrderEntry orderE = new OrderEntry()
        {
            Quantity = dto.Quantity,
            OrderId = dto.OrderId,
            ProductId = dto.ProductId
        };
        
        return Ok(dao.UpdateOrder(orderE));
    }

    [HttpDelete]
    [Route("api/orderEntry")]
    public void DeleteOrderEntry(int id)
    {
        dao.DeleteOrder(id);
    }
    
}