using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repositories.Migrations
{
    public partial class userIdentityUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "24693647, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 8, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 5 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 8, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), 8 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 12 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 11, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 13 });

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Id", "FinishDate", "PackageId", "StartDate", "UserId" },
                values: new object[] { 10, new DateTime(2022, 7, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, null, 5 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "24693647, 1");

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 8, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 9 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 10 });

            migrationBuilder.UpdateData(
                table: "Subscriptions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "FinishDate", "PackageId" },
                values: new object[] { new DateTime(2022, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 14 });

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Id", "FinishDate", "PackageId", "StartDate", "UserId" },
                values: new object[] { 1, new DateTime(2022, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, null, 5 });
        }
    }
}
