using System.Text.Json;
using PgCtx;
using Service.Data_Access_Objects;
using Service.Mocks;
using Service.Models;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace Service.Tests;


public class PaperTests(ITestOutputHelper outputHelper) 
{

    private readonly PgCtxSetup<MyDbContext> setup = new(configureServices: 
        services =>
        {
            services.AddTransient<PaperDAO>();
        });

    [Fact]
    public void GetPapers_GetsAllPapers()
    {
        var papers = new List<Paper>
        {
            MockPaper.GetPapers(),
            MockPaper.GetPapers(),
            MockPaper.GetPapers(),
            MockPaper.GetPapers()
        };
        
        setup.DbContextInstance.Papers.AddRange(papers);
        setup.DbContextInstance.SaveChanges();

        var result = setup.ServiceProviderInstance.GetRequiredService<PaperDAO>().GetAllPapers();
        
        Assert.Equivalent(papers, result);
    }
    
    /*
    [Fact]
    public void AddPaper_AddsPaper()
    {
        outputHelper.WriteLine("hi");
        
        var paper = MockPaper.GetPapers();
        
        outputHelper.WriteLine(paper.Id.ToString());
        
        setup.DbContextInstance.Papers.Add(paper);
        setup.DbContextInstance.SaveChanges();

        var result = setup.ServiceProviderInstance.GetRequiredService<PaperDAO>().AddPaper(paper);
        
        outputHelper.WriteLine(result.Id.ToString());
        
        
        Assert.Equal(paper.Name, result.Name);
    }
    */
}