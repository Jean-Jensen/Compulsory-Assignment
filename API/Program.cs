using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApiDocument();

builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseNpgsql(Environment.GetEnvironmentVariable("Db") ??
                      builder.Configuration.GetConnectionString("Db"));
});
builder.Services.AddMvcCore()
    .AddDataAnnotations()
    .AddCors();

var app = builder.Build();

app.MapControllers();

app.UseOpenApi();
app.UseSwaggerUi();

//var connectionString = builder.Configuration.GetConnectionString("Db");
//Console.WriteLine(connectionString);

//app.MapGet("/", () => "Hello World!");

app.UseCors( opts => {

    opts.AllowAnyOrigin();

    opts.AllowAnyMethod();

    opts.AllowAnyHeader();

});

app.Run();