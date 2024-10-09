using Bogus;
using Service.Models;

namespace Service.Mocks;

public class MockPaper
{
    public static Paper GetPapers()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Id, f => f.Random.Int())
            .RuleFor(p => p.Name, f => f.Name.FullName())
            .RuleFor(p => p.Discontinued, f => f.IndexFaker == 0 ? true : false)
            .RuleFor(p => p.Stock, f => f.Random.Int(0, 5000))
            .RuleFor(p => p.Price, f => f.Random.Double(0.00, 100));
    }
}