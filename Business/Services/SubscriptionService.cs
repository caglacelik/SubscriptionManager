using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Repositories;
using Core.Services;
using Core.UnitOfWork;
using Service.Services.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SubscriptionService : Service<Subscription>, ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IMapper _mapper;
        public SubscriptionService(IGenericRepository<Subscription> genericRepository, IUnitOfWork unitOfWork, ISubscriptionRepository subscriptionRepository, IMapper mapper) : base(genericRepository, unitOfWork)
        {
            _subscriptionRepository = subscriptionRepository;
            _mapper = mapper;
        }

        public async Task<List<ExpenseDto>> GetAllSubscriptionsByUserId(int userId)
        {
            var subscriptions = await _subscriptionRepository.GetAllSubscriptionsByUserId(userId);

            if (subscriptions == null)
            {
                throw new NotFoundException("Not Found");
            }
            return subscriptions;
        }

        public async Task<List<ExpenseDto>> GetSubscriptionsByCategory(int userId, string categoryName)
        {
            var subscriptions = await _subscriptionRepository.GetSubscriptionsByCategory(userId, categoryName);

            if (subscriptions == null)
            {
                throw new NotFoundException("Not Found");
            }
            return subscriptions;

        }
        public async Task<TotalExpenseDto> GetTotalExpenses(int userId)
        {
            return await _subscriptionRepository.GetTotalExpenses(userId);

        }
        public async Task<SubscriptionDto> GetBySubscriptionId(int subscriptionId)
        {
            var subscription = await _subscriptionRepository.GetBySubscriptionId(subscriptionId);

            if (subscription == null)
            {
                throw new NotFoundException("Not Found");
            }
            return subscription;
        }

    }
}
