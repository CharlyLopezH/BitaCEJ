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
        }

    }
}
