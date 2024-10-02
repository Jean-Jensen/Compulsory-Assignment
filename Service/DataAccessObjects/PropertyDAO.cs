using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Service.Data_Access_Objects;

public class PropertyDAO(MyDbContext context)
{
    public List<Models.Property> GetAllProperties()
    {
        return context.Properties.ToList();
    }

    public Models.Property AddProperty( Models.Property prop)
    {
        context.Properties.Add(prop);
        context.SaveChanges();
        return context.Properties.SingleOrDefault(p => p.Id == prop.Id);
    }

    public Models.Property UpdateProperty(Models.Property prop)
    {
        
        context.Properties.Update(prop);
        context.SaveChanges();
        return context.Properties.SingleOrDefault(p => p.Id == prop.Id);
        
    }
    
    public void DeletePropety(int id)
    {
        Models.Property prop = context.Properties.Where(prop => prop.Id == id).ToList().First();
        context.Properties.Remove(prop);
        context.SaveChanges();
    }
}