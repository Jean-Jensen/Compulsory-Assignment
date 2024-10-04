namespace Service.DataTransferObjects;

public class OrderEntryDto
{
    public int Quantity { get; set; }

    public int? ProductId { get; set; }

    public int? OrderId { get; set; }

}