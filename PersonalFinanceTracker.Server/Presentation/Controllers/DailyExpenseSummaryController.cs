using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Server.Presentation.Dtos;

namespace PersonalFinanceTracker.Server.Presentation.Controllers;

[ApiController]
[Route("api/daily-expense-summary")]
public sealed class DailyExpenseSummaryController : ControllerBase
{
    /// <summary>
    /// Placeholder data for the 10-day daily expense summary (same window as the UI).
    /// </summary>
    /// <param name="startDate">First day (inclusive), yyyy-MM-dd. Defaults to today (server local date).</param>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<DailyTotalRowDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<IReadOnlyList<DailyTotalRowDto>> Get([FromQuery] string? startDate)
    {
        DateOnly start;
        if (string.IsNullOrWhiteSpace(startDate))
        {
            start = DateOnly.FromDateTime(DateTime.Today);
        }
        else if (!DateOnly.TryParse(startDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out start))
        {
            return BadRequest("startDate must be a valid calendar date in yyyy-MM-dd form.");
        }

        var rows = new DailyTotalRowDto[10];
        for (var i = 0; i < 10; i++)
        {
            var day = start.AddDays(i);
            rows[i] = BuildPlaceholderRow(day);
        }

        return Ok(rows);
    }

    private static DailyTotalRowDto BuildPlaceholderRow(DateOnly date)
    {
        var iso = date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        // Deterministic placeholder: vary sample rows by day-of-month so Swagger responses look realistic.
        if (date.Day % 4 == 0)
        {
            return new DailyTotalRowDto(iso, 0, 0, []);
        }

        var expenses = new List<ExpenseItemDto>
        {
            new(
                Id: $"placeholder-{iso}-a",
                Date: iso,
                Amount: 18.75m,
                Description: "Sample groceries (placeholder)",
                Category: "Food",
                Notes: null),
        };

        if (date.Day % 3 == 1)
        {
            expenses.Add(new ExpenseItemDto(
                Id: $"placeholder-{iso}-b",
                Date: iso,
                Amount: 4.50m,
                Description: "Coffee (placeholder)",
                Category: "Food",
                Notes: null));
        }

        var total = expenses.Sum(e => e.Amount);
        return new DailyTotalRowDto(iso, total, expenses.Count, expenses);
    }
}
