using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NoticeAPI.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Adscripcione> Adscripciones { get; set; }

    public virtual DbSet<Notificadore> Notificadores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=10.14.1.103;Database=NoticeDbTest;User Id=noticelogin;Password=n0tic3l0gin_;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Adscripcione>(entity =>
        {
            entity.HasIndex(e => e.NombreCorto, "IX_NombreCorto");

            entity.HasIndex(e => e.Siglas, "IX_Siglas").IsUnique();

            entity.Property(e => e.ApellidosTitular)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Nivel).HasDefaultValue(0);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreCorto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreTitular)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Siglas)
                .HasMaxLength(6)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Notificadore>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Notificador");

            entity.HasIndex(e => e.TelCelular, "IX_Celular").IsUnique();

            entity.HasIndex(e => e.Gafette, "IX_Gafette").IsUnique();

            entity.Property(e => e.Id).HasComment("Clave Primaria Tabla Notificador");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Foto)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TelCelular)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.TelParticular)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.TeleEmergencia)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.FkAdscripcionNavigation).WithMany(p => p.Notificadores)
                .HasForeignKey(d => d.FkAdscripcion)
                .HasConstraintName("FK_Notificadores_Adscripciones");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
