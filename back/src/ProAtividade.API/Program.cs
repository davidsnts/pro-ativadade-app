using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using ProAtividade.API.Data;

var builder = WebApplication.CreateBuilder(args);

//adicionar os controlers e converter o enum para aparecer a descrição do enum
builder.Services.AddControllers().AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add( new JsonStringEnumConverter()); });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//adicionar dataContext 
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

//perimitir cors para o front
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.MapControllers();
app.UseCors(option => option.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();
