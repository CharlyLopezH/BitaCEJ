
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using NoticeAPI.DTOs;
using NoticeAPI.Repositorios;

namespace NoticeAPI.Endpoints
{
    public static class NotificacionesEndpoints
    {        
        public static RouteGroupBuilder MapNotificaciones(this RouteGroupBuilder group)
        {
            
            group.MapGet("/todas", ObtenerTodas).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("notificaciones-get"));
            return group;
        }

        //Regresa lista *Sin Paginar* de notificaciones        
        static async Task<Ok<List<NotificacionDTO>>> ObtenerTodas(IRepositorioNotificaciones repositorio, IMapper mapper)
        {
            var notificaciones = await repositorio.ObtenerTodas();
            var notificacionesDTO = mapper.Map<List<NotificacionDTO>>(notificaciones);
            return TypedResults.Ok(notificacionesDTO);
        }
    }
}
