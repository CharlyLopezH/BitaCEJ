﻿using Microsoft.EntityFrameworkCore;

namespace NoticeAPI.Utilidades
{    
     public static class HttpContextExtensions
    {
        public async static Task InsertarParametrosPaginacionEnCabecera<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
        {
            //if (httpContext is null) { throw new ArgumentNullException(nameof(httpContext)); }
            ArgumentNullException.ThrowIfNull(httpContext);

            double cantidad = await queryable.CountAsync();
            httpContext.Response.Headers.Append("cantidadTotalRegistros", cantidad.ToString());
        }
    }
}