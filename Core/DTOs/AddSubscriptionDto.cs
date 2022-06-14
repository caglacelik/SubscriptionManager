using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class AddSubscriptionDto
    {
        [Required]
        public DateTime FinishDate { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int PackageId { get; set; }

    }
}
