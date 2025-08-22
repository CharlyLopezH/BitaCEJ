using Microsoft.EntityFrameworkCore;
using NoticeAPI.DTOs;
using NoticeAPI.Entidades;
using System;

namespace NoticeAPI
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor para la aplicación (inyección de dependencias)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Constructor PARA MIGRACIONES (tiempo de diseño)
        public ApplicationDbContext()
        {
        }

        //Mapeo de las entidades a las tablas de la base de datos (**No ejecutar update-database en el PM si no están mapeadas)
        public required DbSet<Ente> Entes { get; set; }
        public required DbSet<Notificacion> Notificaciones { get; set; } 


        // Configuración manual cuando no hay inyección de dependencias
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        //optionsBuilder.UseSqlServer("Server=10.14.1.103;Database=NoticeDb;User ID=noticelogin;Password=n0tic3l0gin_;TrustServerCertificate=True");
        //    }
        //}


    }
}
