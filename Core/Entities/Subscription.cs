using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Subscription : IEntity
    {
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public int UserId { get; set; }
        //public int BillCycle { get; set; }
        public User User { get; set; }
        public int PackageId { get; set; }
        public Package Package { get; set; }
    }
}







