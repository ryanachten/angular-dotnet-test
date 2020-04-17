﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularDotNet.API.Migrations
{
    public partial class AddPublicIdToPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoId",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Photos");
        }
    }
}
