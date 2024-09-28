namespace Service.Data_Access_Objects;

public class CreatePaperDto
{
    
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }


}