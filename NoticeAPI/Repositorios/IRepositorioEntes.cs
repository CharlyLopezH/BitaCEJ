using NoticeAPI.DTOs;
using NoticeAPI.Entidades;

namespace NoticeAPI.Repositorios
{
    public interface IRepositorioEntes
    {
        Task<List<Ente>> ObtenerTodos();
        //Lista paginada de entes
        Task<List<Ente>> Obtener(PaginacionDTO paginacionDTO);
        Task<int> Crear(Ente ente);        
        Task<int> Actualizar(Ente ente);
        Task Borrar(int id);
        Task<bool> Existe(int id);
        Task<Ente?> ObtenerPorId(int id);
        Task<List<Ente>> ObtenerPorNombre(string nombre);
        Task<List<Ente>> BuscarRegistros(string cadena);

        //Task<List<Ente>> BusquedaEspecial(string cadena);

    }

}
