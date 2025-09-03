
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
using NoticeAPI.Repositorios;

namespace NoticeAPI.Endpoints
{
    public static class NotificacionesEndpoints
    {        
        public static RouteGroupBuilder MapNotificaciones(this RouteGroupBuilder group)
        {

            //Endpoint para obtener todas las notificaciones *Sin paginar* y con cache por 30 seg.
            group.MapGet("/todas", ObtenerTodas).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("notificaciones-get"));
            //Endpoint para crear una notificación
            group.MapPost("/", CrearNotificacion);
            //Endpoint para obtener notificaciones por Id
            group.MapGet("/{id:int}", ObtenerPorId);
            //Endpoint con filtrado de dato y paginacion (string)
            group.MapGet("buscarNotificaciones/{cadena}", FiltrarNotificaciones).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("notificaciones-get"));
            //Endpoint para borrar una notificación por Id
            group.MapDelete("/{id:int}", Borrar);
            //Endpoint para actualizar una notificación por Id
            group.MapPut("/{id:int}", Actualizar).DisableAntiforgery();
            return group;
        }




        //Regresa lista *Sin Paginar* de notificaciones        
        static async Task<Ok<List<NotificacionDTO>>> ObtenerTodas(IRepositorioNotificaciones repositorio, IMapper mapper)
        {
            var notificaciones = await repositorio.ObtenerTodas();
            var notificacionesDTO = mapper.Map<List<NotificacionDTO>>(notificaciones);
            return TypedResults.Ok(notificacionesDTO);
        }

        //Crea una notificación
        static async Task<Created<NotificacionDTO>> CrearNotificacion(CrearNotifcacionDTO crearNotifcacionDTO, IRepositorioNotificaciones repositorio,
            IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var notificacion = mapper.Map<Notificacion>(crearNotifcacionDTO);
            var id = await repositorio.Crear(notificacion);
            await outputCacheStore.EvictByTagAsync("notificaciones-get", default);
            var notificacionDTO = mapper.Map<NotificacionDTO>(notificacion);
            return TypedResults.Created($"/notificaciones/{id}", notificacionDTO);
        }

        //Obtiene una notificación por Id
        static async Task<Results<Ok<NotificacionDTO>, NotFound>> ObtenerPorId(int id,
        IRepositorioNotificaciones repositorio, IMapper mapper)
        {
            var notificacion = await repositorio.ObtenerPorId(id);

            if (notificacion is null)
            {
                return TypedResults.NotFound();
            }

            var notificacionDTO = mapper.Map<NotificacionDTO>(notificacion);
            return TypedResults.Ok(notificacionDTO); //Se encontro Id
        }

        static async Task<Ok<List<NotificacionDTO>>> FiltrarNotificaciones(string cadena, IRepositorioNotificaciones repositorio, IMapper mapper,
                    int pagina = 1, int recordsPorPagina = 10)
        {
            var paginacion = new PaginacionDTO { Pagina = pagina, RecordsPorPagina = recordsPorPagina };
            var notificaciones = await repositorio.FiltrarRegistros(cadena, paginacion);
            var notificacionesDTO = mapper.Map<List<NotificacionDTO>>(notificaciones);
            return TypedResults.Ok(notificacionesDTO);
        }

        //Borra una notificación por Id
        static async Task<Results<NoContent, NotFound>> Borrar(int id, IRepositorioNotificaciones repositorio,IOutputCacheStore outputCacheStore)        
        {
            var notificacionDB = await repositorio.ObtenerPorId(id);

            if (notificacionDB is null)
            {
                return TypedResults.NotFound();
            }
            await repositorio.Borrar(id);
            await outputCacheStore.EvictByTagAsync("entes-get", default);
            return TypedResults.NoContent();
        }

        static async Task<Results<NoContent, NotFound>> Actualizar(int id, [FromForm] CrearNotifcacionDTO crearNotificacionDTO, IRepositorioNotificaciones repositorio, IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var notificacionDB = await repositorio.ObtenerPorId(id);

            if (notificacionDB is null)
            {
                return TypedResults.NotFound();
            }

            var notificacionActualizar = mapper.Map<Notificacion>(crearNotificacionDTO);
            notificacionActualizar.Id = id;
            await repositorio.Actualizar(notificacionActualizar);
            await outputCacheStore.EvictByTagAsync("notificaciones-get", default);
            return TypedResults.NoContent();
        }
    }
}
