using System;
using System.Collections.Generic;

namespace NoticeAPI.Models;

public partial class Notificadore
{
    /// <summary>
    /// Clave Primaria Tabla Notificador
    /// </summary>
    public int Id { get; set; }

    public int Gafette { get; set; }

    public string? Nombres { get; set; }

    public string? Apellidos { get; set; }

    public string TelCelular { get; set; } = null!;

    public string? TelParticular { get; set; }

    public string? TeleEmergencia { get; set; }

    public bool? Activo { get; set; }

    public string? Foto { get; set; }

    public int? FkAdscripcion { get; set; }

    public virtual Adscripcione? FkAdscripcionNavigation { get; set; }
}
