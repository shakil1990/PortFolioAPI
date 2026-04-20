namespace PersonalFinanceTracker.Server.Presentation.Dtos;

/// <summary>
/// Matches the client summary table: one row per calendar day in the 10-day window.
/// </summary>
public sealed record ExpenseItemDto(
    string Id,
    string Date,
    decimal Amount,
    string Description,
    string? Category,
    string? Notes);

public sealed record DailyTotalRowDto(
    string Date,
    decimal Total,
    int Count,
    IReadOnlyList<ExpenseItemDto> Expenses);
