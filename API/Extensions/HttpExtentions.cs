using System.Text.Json;
using API.Helpers;

namespace API.Extensions
{
  public static class HttpExtentions
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            
            // Use IHeaderDictionary.Append or the indexer to append or set headers
            response.Headers.Append("Pagination", JsonSerializer.Serialize(header, jsonOptions));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }

    }
}