using Service.Models;

namespace Service.Data_Access_Objects;

public class EditPaperDto
{
    public int Id { get; set; }
    
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public EditPaperDto FromEntity(Paper pap)
    {
        return new EditPaperDto
        {
            Id = pap.Id,
            Name = pap.Name,
            Discontinued = pap.Discontinued,
            Stock = pap.Stock,
            Price = pap.Price
        };
    }


}