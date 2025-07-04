using NoticeAPI.DTOs;
using NoticeAPI.Entidades;

namespace NoticeAPI.Repositorios
{
    public interface IRepositorioEntes
    {
        //Obtiene todos los entes sin paginación
        Task<List<Ente>> ObtenerTodos();
        //Lista paginada de entes con paginación
        Task<List<Ente>> Obtener(PaginacionDTO paginacionDTO);
        Task<int> Crear(Ente ente);        
        Task<int> Actualizar(Ente ente);
        Task Borrar(int id);
        Task<bool> Existe(int id);
        Task<Ente?> ObtenerPorId(int id);
        Task<List<Ente>> FiltrarRegistros(string nombre, PaginacionDTO paginacionDTO);

        Task<List<Ente>> FiltrarRegistros(string nombre);
        //Task<List<Ente>> FiltrarRegistrosPag(string cadena, PaginacionDTO paginacionDTO);
        Task<List<Ente>> FiltrarSinPaginar(string cadena); 
        //Filtro de Entes Sin paginación, recibe una cadena de búsqueda y un DTO para paginación                

    }

}
