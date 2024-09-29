using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Data_Access_Objects;
using Service.Models;

namespace API.Controllers;

[Route("")]
public class PaperController(MyDbContext context) : ControllerBase
{

    private PaperDAO dao = new PaperDAO(context);
    
    [HttpGet]
    [Route("api/papers")]
    public ActionResult<List<Paper>> GetPapers()
    {
        return Ok(dao.GetAllPapers());
    }
    
    [HttpPost]
    [Route("api/paper")]
    public ActionResult<List<Paper>> AddPaper([FromBody] CreatePaperDto dto)
    {
        var paper = new Paper()
        {
            Name = dto.Name,
            Discontinued = dto.Discontinued,
            Price = dto.Price,
            Stock = dto.Stock,
            Properties = new List<Property>(){new Property() { PropertyName = "string" }}
        };
        
        var result = (dao.AddPaper(paper));
        return Ok(result);
    }
    
    [HttpPatch]
    [Route("api/paper")]
    public ActionResult<Paper> UpdatePaper(Paper paper)
    {
        Console.WriteLine(JsonSerializer.Serialize(paper));
        context.Papers.Update(paper);
        context.SaveChanges();
        return Ok();
    }
    
    [HttpDelete]
    [Route("api/paper")]
    public ActionResult<List<Paper>> DeletePaper(int id)
    {
        dao.DeletePaper(id);
        return Ok();
    }
    
}