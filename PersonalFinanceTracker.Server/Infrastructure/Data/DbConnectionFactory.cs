using Microsoft.Data.SqlClient;
using PersonalFinanceTracker.Server.Infrastructure.Data.Abstractions;

namespace PersonalFinanceTracker.Server.Infrastructure.Data;

public sealed class DbConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(configuration);
        _connectionString = configuration.GetConnectionString("FinanceTrackerDB")
            ?? throw new InvalidOperationException(
                "Connection string 'FinanceTrackerDB' is not configured. Set ConnectionStrings:FinanceTrackerDB in appsettings, user secrets, or environment variables.");
    }

    public SqlConnection CreateConnection() => new(_connectionString);
}
