using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NoticeAPI.Entidades
{
    [Table("Entes")]  // Mapea la clase con la tabla "Entes" en la BD
    public class Ente
    {
        [Key]  // Indica que es la clave primaria (asumiendo que "Id" es PK)
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Auto-incremental
        public int Id { get; set; }

        [Required]  // No permite valores nulos
        [StringLength(200)]  // Equivalente a varchar(200)
        public string Nombre { get; set; } = null!;

        [Required]
        [StringLength(20)]  // Equivalente a nchar(20)
        [Column(TypeName = "nchar(20)")]  // Fuerza el tipo exacto en la BD
        public string Tipo { get; set; } = null!;
    }

}
