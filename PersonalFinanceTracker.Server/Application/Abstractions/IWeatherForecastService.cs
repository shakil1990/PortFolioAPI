using PersonalFinanceTracker.Server.Domain.Entities;

namespace PersonalFinanceTracker.Server.Application.Abstractions;

public interface IWeatherForecastService
{
    IReadOnlyList<WeatherForecast> GetForecasts();
}
