using System.ComponentModel.DataAnnotations;
using Service.Models;

namespace Service.Data_Access_Objects;

public class CreatePaperDto
{
    //, ErrorMessage = "name is too long, we can't display all of that!"
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public CreatePaperDto FromEntity(Paper pap)
    {
        return new CreatePaperDto
        {
            Name = pap.Name,
            Discontinued = pap.Discontinued,
            Stock = pap.Stock,
            Price = pap.Price
        };
    }


}