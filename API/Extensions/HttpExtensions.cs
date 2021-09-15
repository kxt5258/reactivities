using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int CurrentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                CurrentPage,
                itemsPerPage,
                totalItems,
                totalPages
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
            //expose the cusom header
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}