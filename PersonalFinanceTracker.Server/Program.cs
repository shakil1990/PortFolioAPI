using Microsoft.OpenApi;
using PersonalFinanceTracker.Server.Application.Abstractions;
using PersonalFinanceTracker.Server.Application.Services;
using PersonalFinanceTracker.Server.Infrastructure.Data;
using PersonalFinanceTracker.Server.Infrastructure.Data.Abstractions;

var builder = WebApplication.CreateBuilder(args);

// Infrastructure
builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
builder.Services.AddScoped<IDataAccess, DapperDataAccess>();

// Application
builder.Services.AddSingleton<IWeatherForecastService, WeatherForecastService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Personal Finance Tracker API",
        Version = "v1",
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
