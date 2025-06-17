using System;
using System.Collections.Generic;

namespace NoticeAPI.Models;

public partial class Adscripcione
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Siglas { get; set; }

    public string? NombreCorto { get; set; }

    public string? NombreTitular { get; set; }

    public string? ApellidosTitular { get; set; }

    public bool? Activa { get; set; }

    public int? Nivel { get; set; }

    public int? DependeDe { get; set; }

    public virtual ICollection<Notificadore> Notificadores { get; set; } = new List<Notificadore>();
}
