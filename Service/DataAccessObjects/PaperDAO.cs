using System.Collections.Concurrent;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Data_Access_Objects;

public class PaperDAO(MyDbContext context)
{

    public List<Paper> GetAllPapers()
    {
        return context.Papers.ToList();
    }

    public Paper AddPaper( Paper paper)
    {
        context.Papers.Add(paper);
        context.SaveChanges();
        return paper;
    }

    public void DeletePaper(int id)
    {
        Paper paper = context.Papers.Where(paper => paper.Id == id).ToList().First();
        context.Papers.Remove(paper);
        context.SaveChanges();
    }
    
    //set discontinue/soft delete instead of delete

    public Paper UpdatePaper( Paper paper)
    {
        
        context.Papers.Update(paper);
        context.SaveChanges();
        return context.Papers.SingleOrDefault(p => p.Id == paper.Id);
        
    }
 
    //Raw SQL if I ever need it:
    //context.Papers.fromSqlRaw($"--sql statement here--").toList
    // remember to put a \ in front of quotes
    
}