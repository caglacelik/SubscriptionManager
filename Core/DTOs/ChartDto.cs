using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class ChartDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CountOf { get; set; }

    }
}
