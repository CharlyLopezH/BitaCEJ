using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoticeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AgregarNotificaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Notificaciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OficioMemo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaBitacora = table.Column<DateOnly>(type: "date", nullable: false),
                    Destinatario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notificador = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpedienteAsunto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaAcuse = table.Column<DateOnly>(type: "datetime2", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Capturo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notificaciones", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "Notificaciones");
        }
    }
}
