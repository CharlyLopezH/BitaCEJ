using NoticeAPI.DTOs;
using NoticeAPI.Entidades;

namespace NoticeAPI.Repositorios
{
    public interface IRepositorioNotificaciones
    {
        //Obtiene todos los entes sin paginación
        Task<List<Notificacion>> ObtenerTodas();
        //Lista paginada de entes con paginación
        Task<List<Notificacion>> Obtener(PaginacionDTO paginacionDTO);
        Task<int> Crear(Notificacion notificacion);
        Task<int> Actualizar(Notificacion notificacion);
        Task Borrar(int id);
        Task<bool> Existe(int id);
        Task<Notificacion?> ObtenerPorId(int id);
        Task<List<Notificacion>> FiltrarRegistros(string memo, PaginacionDTO paginacionDTO);

        Task<List<Notificacion>> FiltrarRegistros(string memo);
        //Task<List<Notificacion>> FiltrarRegistrosPag(string cadena, PaginacionDTO paginacionDTO);
        Task<List<Notificacion>> FiltrarSinPaginar(string cadena);
        //Filtro de Notificacions Sin paginación, recibe una cadena de búsqueda y un DTO para paginación                

    }
}
