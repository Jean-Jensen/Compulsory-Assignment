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
        return context.Papers.SingleOrDefault(p => p.Id == paper.Id);
    }
    
    
    //set discontinue/soft delete instead of delete

    public Paper UpdatePaper(Paper paper)
    {
        
        context.Papers.Update(paper);
        context.SaveChanges();
        return context.Papers.SingleOrDefault(p => p.Id == paper.Id);
        
    }
 
    //Raw SQL if I ever need it:
    //context.Papers.fromSqlRaw($"--sql statement here--").toList
    // remember to put a \ in front of quotes
    
    public void DeletePaper(int id)
    {
        Paper paper = GetPaperFromID(id);
        context.Papers.Remove(paper);
        context.SaveChanges();
    }

    public void DiscontinuePaper(int id)
    {
        Paper p = GetPaperFromID(id);
        if (!p.Discontinued)
        {
            p.Discontinued = true;
        }
        
        context.Papers.Update(p);
        context.SaveChanges();
    }
    
    public List<Paper> GetAllPapersInLimit(int startIndex, int endIndex)
    {
        List<Paper> inLimit = context.Papers.ToList().Slice(startIndex, endIndex);
        return inLimit;
    }

    public void AddPropertyToPaper(Property prop, int paperId)
    {
        Paper p = GetPaperFromID(paperId);
        p.Properties.Add(prop);
        context.SaveChanges();
    }
    
    public void AddPropertiesToPaper(List<Property> props, int paperId)
    {
        Paper p = GetPaperFromID(paperId);
        for (int i = 0; i <= props.Count; i++)
        {
            p.Properties.Add(props[i]);
        }
        context.SaveChanges();
    }

    public Paper GetPaperFromID(int id)
    {
        return context.Papers.Where(pap => pap.Id == id).ToList().First();
    }
    
    public List<Paper> GetPaperWithName(string name){
           return context.Papers.Where(p => p.Name.Contains(name)).ToList();
    }
    
    public List<Paper> GetPaperHighestStock()
    {
        return context.Papers.OrderByDescending(p => p.Stock).ToList();
    }
    
    public List<Paper> GetPaperHighestPrice()
    {
        return context.Papers.OrderByDescending(p => p.Price).ToList();
    }
    
    public List<Paper> GetPaperLowestStock()
    {
        return context.Papers.OrderBy(p => p.Stock).ToList();
    }
    
    public List<Paper> GetPaperLowestPrice()
    {
        return context.Papers.OrderBy(p => p.Price).ToList();
    }
    
}