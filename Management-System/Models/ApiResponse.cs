using System.Net;
using System.Text.Json;

namespace ManagementSystem.Models;

public class ApiResponse<T>
{
    public ApiResponse(HttpStatusCode statusCode, string? resultJson, ApiLog apiLog, string? errorMessage, bool success = false, string responseTime = "0")
    {
        StatusCode = (int)statusCode;
        ApiLog = apiLog;
        ErrorMessage = errorMessage;
        Success = success;
        ResponseTime = responseTime;
        try
        {
            Result = string.IsNullOrEmpty(resultJson)
                ? default
                : JsonSerializer.Deserialize<T>(resultJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        catch (JsonException ex)
        {
            Console.WriteLine(ex.Message);
            Result = string.IsNullOrEmpty(resultJson) ? default : (T)(object)resultJson;
        }
    }

    /// <summary>
    /// Version of Api used
    /// </summary>
    public string Version { get { return "1"; } }

    /// <summary>
    /// Status Code of the Request
    /// </summary>
    public int StatusCode { get; set; }

    /// <summary>
    /// Error Code of the Request
    /// </summary>
    public string? ErrorMessage { get; set; }

    /// <summary>
    /// Generic Object served as result
    /// </summary>
    public T? Result { get; set; }

    /// <summary>
    /// Response Api time in miliseconds
    /// </summary>
    public string ResponseTime { get; set; }

    /// <summary>
    /// Succes or not
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// API log of the request
    /// </summary>
    public ApiLog ApiLog { get; set; }
}