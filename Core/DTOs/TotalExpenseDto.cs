using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class TotalExpenseDto
    {
        public List<ExpenseDto> subscriptions { get; set; }
        public int SubNumber { get; set; }
        public decimal SubTotalMonth { get; set; }
        public decimal SubTotalYear { get; set; }

        public TotalExpenseDto(List<ExpenseDto> Subscriptions)
        {
            subscriptions = Subscriptions;
            SubNumber = Subscriptions.Count;
            SubTotalMonth = Subscriptions.Sum(x => x.Price);
            SubTotalYear = Subscriptions.Sum(x => x.Price * 12);
        }
    }
}
