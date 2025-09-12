using System.ComponentModel.DataAnnotations;

namespace NoticeAPI.DTOs
{
    public class CrearNotifcacionDTO
    {
        public string OficioMemo { get; set; } = null!;
        public DateOnly FechaBitacora { get; set; }
        public string Destinatario { get; set; } = null!;
        public string Notificador { get; set; } = null!;
        public string ExpedienteAsunto { get; set; } = null!;
        public DateOnly FechaAcuse { get; set; }
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
        public string Capturo { get; set; } = null!;
    }
}
