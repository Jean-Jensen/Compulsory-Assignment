using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Service.Data_Access_Objects;

public class PropertyDAO(MyDbContext context)
{
    public List<Models.Property> GetAllPapers()
    {
        return context.Properties.ToList();
    }

    public Models.Property AddpProperty( Models.Property prop)
    {
        context.Properties.Add(prop);
        context.SaveChanges();
        return context.Properties.SingleOrDefault(p => p.Id == prop.Id);
    }
    
    
    //set discontinue/soft delete instead of delete

    public Models.Property UpdatePaper(Models.Property prop)
    {
        
        context.Properties.Update(prop);
        context.SaveChanges();
        return context.Properties.SingleOrDefault(p => p.Id == prop.Id);
        
    }
 
    //Raw SQL if I ever need it:
    //context.Papers.fromSqlRaw($"--sql statement here--").toList
    // remember to put a \ in front of quotes
    
    public void DeletePaper(int id)
    {
        Models.Property prop = context.Properties.Where(prop => prop.Id == id).ToList().First();
        context.Properties.Remove(prop);
        context.SaveChanges();
    }
}