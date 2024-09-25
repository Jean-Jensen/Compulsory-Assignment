using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();

builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Db"));
});


var app = builder.Build();

app.MapControllers();

app.UseOpenApi();
app.UseSwaggerUi();

//var connectionString = builder.Configuration.GetConnectionString("Db");
//Console.WriteLine(connectionString);

//app.MapGet("/", () => "Hello World!");




app.Run();