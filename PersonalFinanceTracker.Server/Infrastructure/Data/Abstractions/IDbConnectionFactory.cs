using Microsoft.Data.SqlClient;

namespace PersonalFinanceTracker.Server.Infrastructure.Data.Abstractions;

/// <summary>
/// Creates <see cref="SqlConnection"/> instances using the configured FinanceTrackerDB connection string.
/// </summary>
public interface IDbConnectionFactory
{
    SqlConnection CreateConnection();
}
