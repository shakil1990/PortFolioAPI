using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Server.Application.Abstractions;
using PersonalFinanceTracker.Server.Domain.Entities;

namespace PersonalFinanceTracker.Server.Presentation.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IWeatherForecastService _weatherForecastService;

    public WeatherForecastController(IWeatherForecastService weatherForecastService)
    {
        _weatherForecastService = weatherForecastService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return _weatherForecastService.GetForecasts();
    }
}
