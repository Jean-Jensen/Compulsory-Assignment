using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
using Service.DataTransferObjects;
using Service.Models;

namespace API.Controllers;

[Route("")]
public class OrderController (MyDbContext context) : ControllerBase
{

   private OrderDAO dao = new OrderDAO(context);
    
   [HttpGet]
   [Route("api/order")]
   public ActionResult<List<Order>> GetOrders()
   {
       return Ok(dao.GetAllOrders());
   }
   
   [HttpGet]
   [Route("api/orderFromCust")]
   public ActionResult<List<Order>> GetOrdersFromCustomer(int custId)
   {
       return Ok(dao.GetAllOrdersFromCustomer(custId));
   }
   
   [HttpGet]
   [Route("api/orderFromId")]
   public ActionResult<List<Order>> GetOrderFromIdr(int Id)
   {
       return Ok(dao.GetOrderFromId(Id));
   }

   [HttpPost]
   [Route("api/order")]
   public ActionResult<Order> AddOrder([FromBody] OrderDto dto)
   {

       Order order = new Order()
       {
           OrderDate = dto.OrderDate,
           DeliveryDate = dto.DeliveryDate,
           Status = dto.Status,
           TotalAmount = dto.TotalAmount,
           CustomerId = dto.CustomerId
       };
       
       return Ok(dao.AddOrder(order));
   }

   [HttpPatch]
   [Route("api/order")]
   public ActionResult<Order> UpdateOrder([FromBody] OrderDto dto)
   {
       Order order = new Order()
       {
           OrderDate = dto.OrderDate,
           DeliveryDate = dto.DeliveryDate,
           Status = dto.Status,
           TotalAmount = dto.TotalAmount,
           CustomerId = dto.CustomerId
       };
       
       return Ok(dao.UpdateOrder(order));
   }
   
   
   [HttpDelete]
   [Route("api/order")]
   public void UpdateOrder(int id)
   {
       dao.DeleteOrder(id);
   }
   
}