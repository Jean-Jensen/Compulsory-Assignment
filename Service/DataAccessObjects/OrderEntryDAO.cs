using Service.Models;

namespace Service.Data_Access_Objects;

public class OrderEntryDAO(MyDbContext context)
{
    public List<OrderEntry> GetAllOrders()
    {
        return context.OrderEntries.ToList();
    }
    
    public OrderEntry AddOrder(OrderEntry orderE)
    {
        context.OrderEntries.Add(orderE);
        context.SaveChanges();
        return context.OrderEntries.SingleOrDefault(oe => oe.Id == orderE.Id);
    }
    
    public OrderEntry UpdateOrder(OrderEntry orderE)
    {
        
        context.OrderEntries.Update(orderE);
        context.SaveChanges();
        return context.OrderEntries.SingleOrDefault(oe => oe.Id == orderE.Id);
        
    }
    
    public void DeleteOrder(int id)
    {
        OrderEntry ord = context.OrderEntries.Where(oe => oe.Id == id).ToList().First();
        context.OrderEntries.Remove(ord);
        context.SaveChanges();
    }

}