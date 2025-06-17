using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
using NoticeAPI.Repositorios;

namespace NoticeAPI.Endpoints
{
    public static class EntesEndpoints
    {
        public static RouteGroupBuilder MapEntes(this RouteGroupBuilder group)
        {
            group.MapGet("/Todos", ObtenerTodos).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("entes-get"));
            group.MapPost("/", CrearEnte);
            group.MapGet("/", Obtener).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(15)).Tag("entes-get"));
            group.MapGet("obtenerPorNombre/{nombre}", ObtenerPorNombre);
            group.MapGet("buscarRegistros/{cadena}", BuscarRegistros);
            group.MapGet("/{id:int}", ObtenerPorId);
            group.MapDelete("/{id:int}", Borrar);            
            group.MapPut("/{id:int}", Actualizar).DisableAntiforgery();

            return group;
        }

        static async Task<Created<EnteDTO>> CrearEnte(CrearEnteDTO crearEnteDTO, IRepositorioEntes repositorio,
        IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var ente = mapper.Map<Ente>(crearEnteDTO);
            var id = await repositorio.Crear(ente);
            await outputCacheStore.EvictByTagAsync("entes-get", default);
            var enteDTO = mapper.Map<EnteDTO>(ente);
            return TypedResults.Created($"/entes/{id}", enteDTO);
        }


        //Regresa lista *Sin Paginar* de entes
        static async Task<Ok<List<EnteDTO>>> ObtenerTodos(IRepositorioEntes repositorio, IMapper mapper)
        {
            var entes = await repositorio.ObtenerTodos();
            var entesDTO = mapper.Map<List<EnteDTO>>(entes);
            return TypedResults.Ok(entesDTO);
        }

        //Regresa lista *paginada* de entes
        static async Task<Ok<List<EnteDTO>>> Obtener(IRepositorioEntes repositorio, IMapper mapper, int pagina = 1, int recordsPorPagina = 10)
        {
            var paginacion = new PaginacionDTO { Pagina = pagina, RecordsPorPagina = recordsPorPagina };
            var entes = await repositorio.Obtener(paginacion);
            var entesDTO = mapper.Map<List<EnteDTO>>(entes);
            return TypedResults.Ok(entesDTO);
        }

        static async Task<Ok<List<EnteDTO>>> ObtenerPorNombre(string nombre,
         IRepositorioEntes repositorio, IMapper mapper)
        {
            var entes = await repositorio.ObtenerPorNombre(nombre);
            var entesDTO = mapper.Map<List<EnteDTO>>(entes);
            return TypedResults.Ok(entesDTO);
        }

        //Busqueda flexible (string en varios campos)
        static async Task<Ok<List<EnteDTO>>> BuscarRegistros(string cadena,
        IRepositorioEntes repositorio, IMapper mapper)
        {
            var entes = await repositorio.BuscarRegistros(cadena);
            var entesDTO = mapper.Map<List<EnteDTO>>(entes);
            return TypedResults.Ok(entesDTO);
        }

        static async Task<Results<Ok<EnteDTO>, NotFound>> ObtenerPorId(int id,
                IRepositorioEntes repositorio, IMapper mapper)
        {
            var ente = await repositorio.ObtenerPorId(id);

            if (ente is null)
            {
                return TypedResults.NotFound();
            }

            var enteDTO = mapper.Map<EnteDTO>(ente);
            return TypedResults.Ok(enteDTO);
        }

        static async Task<Results<NoContent, NotFound>> Actualizar(int id, [FromForm] CrearEnteDTO crearAdscripcionDTO,
          IRepositorioEntes repositorio, IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var enteDB = await repositorio.ObtenerPorId(id);

            if (enteDB is null)
            {
                return TypedResults.NotFound();
            }

            var enteActualizar = mapper.Map<Ente>(crearAdscripcionDTO);
            enteActualizar.Id = id;
            await repositorio.Actualizar(enteActualizar);
            await outputCacheStore.EvictByTagAsync("entes-get", default);
            return TypedResults.NoContent();
        }

        static async Task<Results<NoContent, NotFound>> Borrar(int id, IRepositorioEntes repositorio,
        IOutputCacheStore outputCacheStore)
        {
            var enteDB = await repositorio.ObtenerPorId(id);

            if (enteDB is null)
            {
                return TypedResults.NotFound();
            }
            await repositorio.Borrar(id);
            await outputCacheStore.EvictByTagAsync("entes-get", default);
            return TypedResults.NoContent();
        }




    }
}
