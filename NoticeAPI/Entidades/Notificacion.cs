using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoticeAPI.Entidades
{

        [Table("Notificaciones")]  // Mapeo de la clase con la tabla "Notificaciones" en la BD física ajustar en el dbcontext
    public class Notificacion
        {
         [Key]  // Indica que es la clave primaria (asumiendo que "Id" es PK)
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Auto-incremental
            public int Id { get; set; }

        [Required]
        public string OficioMemo { get; set; } = null!;

        [Required]         
         public DateOnly FechaBitacora { get; set; }


        [Required]
        public string Destinatario { get; set; } = null!;
        
        [Required]
        public string Notificador { get; set; } = null!;

        [Required]
        public string ExpedienteAsunto { get; set; } = null!;


        public DateOnly FechaAcuse { get; set; }

        public DateTime FechaRegistro { get; set; } = DateTime.Now;

         public string Capturo { get; set; } = null!;

    }
}
