using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class EmailDto
    {
        public string ToEmail { get; set; } 
        public string Body { get; set; }
    }
}
