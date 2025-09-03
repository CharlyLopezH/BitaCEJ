using AutoMapper;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;

namespace NoticeAPI.Utilidades
{
    public class AutomapperProfiles:Profile
    {
        public AutomapperProfiles()
        {

            CreateMap<CrearEnteDTO, Ente>();
            CreateMap<Ente, EnteDTO>();
            CreateMap<Notificacion, NotificacionDTO>();
            CreateMap<CrearNotifcacionDTO, Notificacion>()
                .ForMember(dest => dest.Capturo, opt => opt.Ignore()) // Ignorar en mapeo automático
                .ForMember(dest => dest.FechaRegistro, opt => opt.Ignore())
                .AfterMap((src, dest) =>
                {
                 // Inicializar con variable global
                 //dest.Usuario = GlobalUserContext.CurrentUser;
                 dest.Capturo = "User de Prueba";
                 dest.FechaRegistro = DateTime.Now;                 
                });            

        }

    }
}
