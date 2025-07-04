using Microsoft.EntityFrameworkCore;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
using NoticeAPI.Utilidades;
using System.Linq;

namespace NoticeAPI.Repositorios
{
    public class RepositorioEntes : IRepositorioEntes
    {
        private readonly ApplicationDbContext context;
        private readonly HttpContext httpContext;

        public RepositorioEntes(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            httpContext = httpContextAccessor.HttpContext!;
        }


        //Todo es todo, sin paginar si quiera.
        public async Task<List<Ente>> ObtenerTodos()
        {
            var queryable = context.Entes.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);

            //Sin paginación
            return await context.Entes.OrderBy(a => a.Id).ToListAsync();
        }

        public async Task<int> Crear(Ente ente)
        {
            context.Add(ente);
            await context.SaveChangesAsync();
            return (ente.Id);
        }

        public async Task<List<Ente>> Obtener(PaginacionDTO paginacionDTO)
        {

            var queryable = context.Entes.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            //Sin paginación
            //return await context.Adscripciones.OrderBy(a => a.Nombre).ToListAsync(); 

            //Con paginación
            return await queryable.OrderBy(a => a.Id).Paginar(paginacionDTO).ToListAsync();
        }

        //Filtrar Registros con paginación
        public async Task<List<Ente>> FiltrarRegistros(string cadena, PaginacionDTO paginacionDTO)
        {
            if (string.IsNullOrWhiteSpace(cadena))
                return new List<Ente>(); // O lanzar una excepción controlada

            var queryable = context.Entes.AsQueryable();
            //Sin paginación
            //return await context.Adscripciones.OrderBy(a => a.Nombre).ToListAsync(); 

            //Con paginación
            // Primero aplicamos el filtro
            queryable = queryable.Where(a =>
            a.Nombre.Contains(cadena) || (a.Tipo != null && a.Tipo.Contains(cadena)) || // Si Abreviado es opcional
            a.Id.ToString().Contains(cadena) // Búsqueda en ID convertido a string
            ).OrderBy(a => a.Id);

            // Luego calculamos el total filtrado y lo enviamos en los headers
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);

            // Finalmente aplicamos la paginación
            return await queryable.Paginar(paginacionDTO).ToListAsync();

        }


        public async Task<int> Actualizar(Ente ente)
        {
            context.Update(ente);
            await context.SaveChangesAsync();
            return (ente.Id); //Experimental
        }


        public async Task Borrar(int id)
        {
            await context.Entes.Where(a => a.Id == id).ExecuteDeleteAsync();
        }


        public Task<List<Ente>> BusquedaEspecial(string cadena)
        {
            throw new NotImplementedException();
        }


        public async Task<bool> Existe(int id)
        {
            return await context.Entes.AnyAsync(a => a.Id == id);
        }


        public async Task<Ente?> ObtenerPorId(int id)
        {
            return await context.Entes.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }


        public async Task<List<Ente>> FiltrarSinPaginar(string cadena)
        {
            if (string.IsNullOrWhiteSpace(cadena))
                return new List<Ente>(); // O lanzar una excepción controlada

            return await context.Entes
                .Where(a =>
                    a.Nombre.Contains(cadena) ||
                    (a.Tipo != null && a.Tipo.Contains(cadena)) || // Si Abreviado es opcional
                    a.Id.ToString().Contains(cadena) // Búsqueda en ID convertido a string
                                                     // Agrega más campos según necesites
                )
                .OrderBy(a => a.Nombre)
                .AsNoTracking() // Recomendado para solo lectura
                .ToListAsync();
        }

        public async Task<List<Ente>> FiltrarRegistros(string cadena) //Sin paginar!!!
        {
            if (string.IsNullOrWhiteSpace(cadena))
                return new List<Ente>(); // O lanzar una excepción controlada

            return await context.Entes
            .Where(a =>
            a.Nombre.Contains(cadena) || (a.Tipo != null && a.Tipo.Contains(cadena)) || // Si Abreviado es opcional
            a.Id.ToString().Contains(cadena) // Búsqueda en ID convertido a string
            )
            .OrderBy(a => a.Nombre)
            .AsNoTracking() // Recomendado para solo lectura
            .ToListAsync();
        }

   
    }
}
