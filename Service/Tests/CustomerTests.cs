using PgCtx;
using Service.Data_Access_Objects;
using Service.Mocks;
using Service.Models;
using Xunit;

namespace Service.Tests;

public class CustomerTests
{
    private readonly PgCtxSetup<MyDbContext> setup = new(configureServices: 
        services =>
        {
            services.AddTransient<CustomerDAO>();
        });
    
    [Fact]
    public void GetCustomers_GetsAllCustomers()
    {
        var customers = new List<Customer>
        {
            MockCustomer.GetCustomers(),
            MockCustomer.GetCustomers(),
            MockCustomer.GetCustomers(),
            MockCustomer.GetCustomers()
        };
        
        setup.DbContextInstance.Customers.AddRange(customers);
        setup.DbContextInstance.SaveChanges();

        var result = setup.ServiceProviderInstance.GetRequiredService<CustomerDAO>().GetAllCustomers();
        
        Assert.Equivalent(customers, result);
    }
}