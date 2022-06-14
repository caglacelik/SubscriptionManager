using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface ISubscriptionService : IService<Subscription>
    {
        Task<List<ExpenseDto>> GetAllSubscriptionsByUserId(int userId);
        Task<List<ExpenseDto>> GetSubscriptionsByCategory(int userId, string categoryName);
        Task<TotalExpenseDto> GetTotalExpenses(int userId);
        Task<SubscriptionDto> GetBySubscriptionId(int subscriptionId);

    }
}
