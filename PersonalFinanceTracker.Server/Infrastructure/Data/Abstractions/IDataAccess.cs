namespace PersonalFinanceTracker.Server.Infrastructure.Data.Abstractions;

/// <summary>
/// Generic Dapper-based data access for queries and commands.
/// </summary>
public interface IDataAccess
{
    Task<IReadOnlyList<T>> QueryAsync<T>(
        string sql,
        object? param = null,
        CancellationToken cancellationToken = default);

    Task<T?> QueryFirstOrDefaultAsync<T>(
        string sql,
        object? param = null,
        CancellationToken cancellationToken = default);

    Task<int> ExecuteAsync(
        string sql,
        object? param = null,
        CancellationToken cancellationToken = default);
}
