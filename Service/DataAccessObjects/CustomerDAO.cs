using Service.Models;

namespace Service.Data_Access_Objects;

public class CustomerDAO(MyDbContext context)
{
    public List<Customer> GetAllCustomers()
    {
        return context.Customers.ToList();
    }
    
    public Customer GetCustomerFromId(int id)
    {
        return context.Customers.Where(c => c.Id == id).ToList().First();
    }

    public Customer AddCustomer( Customer cust)
    {
        context.Customers.Add(cust);
        context.SaveChanges();
        return context.Customers.SingleOrDefault(c => c.Id == cust.Id);
    }

    public Customer UpdateCustomer(Customer cust)
    {
        
        context.Customers.Update(cust);
        context.SaveChanges();
        return context.Customers.SingleOrDefault(c => c.Id == cust.Id);
        
    }
 
    
    public void DeleteCustomer(int id)
    {
        Customer cust = context.Customers.Where(c => c.Id == id).ToList().First();
        context.Customers.Remove(cust);
        context.SaveChanges();
    }
}