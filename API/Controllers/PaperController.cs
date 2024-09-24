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
    [Route("api/papers")]
    public ActionResult<List<Paper>> AddPaper(Paper paper)
    {
        return Ok(dao.AddPaper(paper));
    }
    
    [HttpPatch]
    [Route("api/paper")]
    public ActionResult<List<Paper>> UpdatePaper(Paper paper)
    {
        return Ok(dao.UpdatePaper(paper));
    }
    
    [HttpDelete]
    [Route("api/paper")]
    public ActionResult<List<Paper>> DeletePaper(int id)
    {
        dao.DeletePaper(id);
        return Ok();
    }
}