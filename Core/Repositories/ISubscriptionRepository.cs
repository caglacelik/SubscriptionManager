using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface ISubscriptionRepository : IGenericRepository<Subscription>
    {
        Task<List<ExpenseDto>> GetAllSubscriptionsByUserId(int userId);
        Task<List<ExpenseDto>> GetSubscriptionsByCategory(int userId, string categoryName);
        Task<TotalExpenseDto> GetTotalExpenses(int userId);
        Task<SubscriptionDto> GetBySubscriptionId(int subscriptionId);
    }
}
