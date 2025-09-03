using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
using NoticeAPI.Migrations;
using NoticeAPI.Utilidades;

namespace NoticeAPI.Repositorios
{
    public class RepositorioNotificaciones : IRepositorioNotificaciones
    {

        private readonly ApplicationDbContext context;
        private readonly HttpContext httpContext;

        public RepositorioNotificaciones(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            httpContext = httpContextAccessor.HttpContext!;
        }

        public async Task<int> Crear(Notificacion notificacion)
        {
            context.Add(notificacion);
            await context.SaveChangesAsync();
            return (notificacion.Id);
        }

        public Task<bool> Existe(int id)
        {
            throw new NotImplementedException();
        }

        //Filtrar Registros de Notificaciones con paginación (para búsquedas especiales)
        public async Task<List<Notificacion>> FiltrarRegistros(string cadena, PaginacionDTO paginacionDTO)
        {
            if (string.IsNullOrWhiteSpace(cadena))
                return new List<Notificacion>(); // O lanzar una excepción controlada

            var queryable = context.Notificaciones.AsQueryable();
            queryable = queryable.Where(a =>
            a.ExpedienteAsunto.Contains(cadena) || 
            (a.OficioMemo != null && a.OficioMemo.Contains(cadena)) || // Si Abreviado es opcional
            a.Id.ToString().Contains(cadena) || // Búsqueda en ID convertido a string
            a.Destinatario.Contains(cadena) ||// Búsqueda en Destinatario
            a.Notificador.Contains(cadena) ||// Búsqueda en Notificador
            a.Capturo.Contains(cadena)).OrderBy(a => a.Id);

            // Luego calculamos el total filtrado y lo enviamos en los headers
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);

            // Finalmente aplicamos la paginación
            return await queryable.Paginar(paginacionDTO).ToListAsync();

        }

        public Task<List<Notificacion>> FiltrarRegistros(string memo)
        {
            throw new NotImplementedException();
        }

        public Task<List<Notificacion>> FiltrarSinPaginar(string cadena)
        {
            throw new NotImplementedException();
        }

        public async Task Borrar(int id)
        {
            await context.Entes.Where(a => a.Id == id).ExecuteDeleteAsync();
        }

        public async Task<Notificacion?> ObtenerPorId(int id)
        {
            return await context.Notificaciones.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Notificacion>> ObtenerTodas()
        {
            var queryable = context.Notificaciones.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);

            //Sin paginación
            return await context.Notificaciones.OrderBy(a => a.Id).ToListAsync();
        }

        public async Task<List<Notificacion>> Obtener(PaginacionDTO paginacionDTO)
        {
            var queryable = context.Notificaciones.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            return await queryable.OrderBy(a => a.Id).Paginar(paginacionDTO).ToListAsync();
        }

        public async Task<int> Actualizar(Notificacion notificacion)
        {
            context.Update(notificacion);
            await context.SaveChangesAsync();
            return (notificacion.Id); //Experimental
        }
    }
}
