using Service.Models;

namespace Service.Data_Access_Objects;

public class OrderDAO(MyDbContext context)
{
    public List<Order> GetAllOrders()
    {
        return context.Orders.ToList();
    }

    public List<Order> GetAllOrdersFromCustomer(int custID)
    {
        return context.Orders.Where(o => o.CustomerId == custID).ToList();
    }

    public Order AddOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
        return context.Orders.SingleOrDefault(o => o.Id == order.Id);
    }
    
    public Order UpdateOrder(Order order)
    {
        
        context.Orders.Update(order);
        context.SaveChanges();
        return context.Orders.SingleOrDefault(o => o.Id == order.Id);
        
    }
    
    public void DeleteOrder(int id)
    {
        Order ord = context.Orders.Where(o => o.Id == id).ToList().First();
        context.Orders.Remove(ord);
        context.SaveChanges();
    }
    
    
    
}