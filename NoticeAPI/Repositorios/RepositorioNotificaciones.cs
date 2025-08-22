using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
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

        public Task<int> Actualizar(Notificacion notificacion)
        {
            throw new NotImplementedException();
        }

        public Task Borrar(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Crear(Notificacion notificacion)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Existe(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Notificacion>> FiltrarRegistros(string memo, PaginacionDTO paginacionDTO)
        {
            throw new NotImplementedException();
        }

        public Task<List<Notificacion>> FiltrarRegistros(string memo)
        {
            throw new NotImplementedException();
        }

        public Task<List<Notificacion>> FiltrarSinPaginar(string cadena)
        {
            throw new NotImplementedException();
        }

        public Task<List<Notificacion>> Obtener(PaginacionDTO paginacionDTO)
        {
            throw new NotImplementedException();
        }

        public Task<Notificacion?> ObtenerPorId(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Notificacion>> ObtenerTodas()
        {
            var queryable = context.Notificaciones.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);

            //Sin paginación
            return await context.Notificaciones.OrderBy(a => a.Id).ToListAsync();
        }







    }
}
