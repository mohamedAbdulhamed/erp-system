using System.Diagnostics;
using System.Net;
using System.Text.Json;
using System.Security.Claims;
using UAParser;
using ManagementSystem.Models;

namespace ManagementSystem.Middlewares
{
    public class ApiResponseMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ApiResponseMiddleware> _logger;

        public ApiResponseMiddleware(RequestDelegate next, ILogger<ApiResponseMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            var requestTimestamp = DateTime.UtcNow;

            var originalBodyStream = context.Response.Body;

            try
            {
                using var responseBodyStream = new MemoryStream();
                context.Response.Body = responseBodyStream;

                await _next(context);

                stopwatch.Stop();

                // Check if the response status code is 204 (No Content)
                if (context.Response.StatusCode == (int)HttpStatusCode.NoContent)
                {
                    context.Response.Body = originalBodyStream;
                    return;
                }

                // Check if the endpoint is GetStatus
                if (context.Request.Path.ToString().Contains("GetStatus", StringComparison.OrdinalIgnoreCase))
                {
                    context.Response.Body.Seek(0, SeekOrigin.Begin);
                    var responseBody = await new StreamReader(context.Response.Body).ReadToEndAsync();

                    context.Response.Body = originalBodyStream;
                    context.Response.ContentType = "application/json";

                    await context.Response.WriteAsync(responseBody);
                    return;
                }

                context.Response.Body.Seek(0, SeekOrigin.Begin);
                var fullResponseBody = await new StreamReader(context.Response.Body).ReadToEndAsync();
                context.Response.Body.Seek(0, SeekOrigin.Begin);

                var userAgent = context.Request.Headers.UserAgent.ToString();
                var uaParser = Parser.GetDefault();
                ClientInfo clientInfo = uaParser.Parse(userAgent);

                var apiLog = new ApiLog
                {
                    RequestIpAddress = context.Connection.RemoteIpAddress?.ToString() ?? "None",
                    RequestMethod = context.Request.Method,
                    RequestUri = context.Request.Path,
                    RequestTimestamp = requestTimestamp,
                    ResponseStatusCode = context.Response.StatusCode,
                    ResponseTimestamp = DateTime.UtcNow,
                    User = context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "None",
                    Application = "ManagementSystem",
                    Machine = Environment.MachineName,
                    Browser = clientInfo.UA.Family,
                    IsBrowserMobile = IsMobileDevice(clientInfo.Device.Family)
                };

                var isSuccess = context.Response.StatusCode >= 200 && context.Response.StatusCode < 300;

                string? errMsg = null;
                string? result = null;

                if (isSuccess)
                {
                    result = fullResponseBody;
                }
                else
                {
                    errMsg = string.IsNullOrEmpty(fullResponseBody) ? GetErrorMessage(context.Response.StatusCode) : fullResponseBody;
                }

                var apiResponse = new ApiResponse<object>(
                    (HttpStatusCode)context.Response.StatusCode,
                    resultJson: result,
                    apiLog,
                    errorMessage: errMsg,
                    success: isSuccess,
                    responseTime: stopwatch.ElapsedMilliseconds.ToString()
                );

                var apiResponseJson = JsonSerializer.Serialize(apiResponse);

                context.Response.Body = originalBodyStream;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(apiResponseJson);
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                _logger.LogError(ex, "An error occurred while processing the request.");

                var apiLog = new ApiLog
                {
                    RequestIpAddress = context.Connection.RemoteIpAddress?.ToString() ?? "None",
                    RequestMethod = context.Request.Method,
                    RequestUri = context.Request.Path,
                    RequestTimestamp = requestTimestamp,
                    ResponseStatusCode = (int)HttpStatusCode.InternalServerError,
                    ResponseTimestamp = DateTime.UtcNow,
                    User = context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "None",
                    Application = "DeviceManagerAPI",
                    Machine = Environment.MachineName,
                    Browser = context.Request.Headers.UserAgent.ToString(), // Fallback to raw User-Agent string in case of error
                    IsBrowserMobile = false // Set to false by default in case of error
                };
                var apiResponse = new ApiResponse<object>(
                    HttpStatusCode.InternalServerError,
                    null,
                    apiLog,
                    errorMessage: "Internal server error",
                    responseTime: stopwatch.ElapsedMilliseconds.ToString()
                );

                var apiResponseJson = JsonSerializer.Serialize(apiResponse);

                context.Response.Body = originalBodyStream;
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                await context.Response.WriteAsync(apiResponseJson);
            }
        }


        private static string GetErrorMessage(int statusCode)
        {
            return statusCode switch
            {
                (int)HttpStatusCode.BadRequest => "Bad request",
                (int)HttpStatusCode.Unauthorized => "Unauthorized, please login with proper credentials",
                (int)HttpStatusCode.Forbidden => "Forbidden, you do not have permission to access this resource",
                (int)HttpStatusCode.NotFound => "Resource not found",
                (int)HttpStatusCode.InternalServerError => "Internal server error",
                _ => "An error occurred"
            };
        }

        private static bool IsMobileDevice(string deviceFamily)
        {
            // Check if the device family indicates a mobile device
            var mobileDevices = new[] { "iPhone", "iPad", "Android", "Windows Phone", "BlackBerry", "Opera Mini", "Mobile" };
            return mobileDevices.Any(m => deviceFamily.Contains(m, StringComparison.OrdinalIgnoreCase));
        }
    }
}
