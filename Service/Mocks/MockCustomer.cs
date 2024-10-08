using Bogus;
using Bogus.DataSets;
using Service.Models;

namespace Service.Mocks;

public class MockCustomer
{
    public static Customer GetCustomers()
    {
        return new Faker<Customer>()
            .RuleFor(p => p.Name, f => f.Name.FullName())
            .RuleFor(p => p.Address, f => f.Address.Locale)
            .RuleFor(p => p.Phone, f => f.Phone.PhoneNumber())
            .RuleFor(p => p.Email, f => f.Random.Utf16String());
    }
}