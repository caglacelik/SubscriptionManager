﻿using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SubscriptionsController : CustomBaseController
    {
        private readonly ISubscriptionService _subscriptionService;
        private readonly IMapper _mapper;

        public SubscriptionsController(IMapper mapper, ISubscriptionService subscriptionService)
        {
            _mapper = mapper;
            _subscriptionService = subscriptionService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllSubscriptionsByUserId(int userId)
        {
            var subscriptions = await _subscriptionService.GetAllSubscriptionsByUserId(userId);
            return CreateActionResult(CustomResponseDto<List<ExpenseDto>>.Success(200, subscriptions));
        }

        [HttpGet("{userId}/{categoryName}")]
        public async Task<IActionResult> GetSubscriptionsByCategory(int userId, string categoryName)
        {
            var subscriptions = await _subscriptionService.GetSubscriptionsByCategory(userId, categoryName);
            return CreateActionResult(CustomResponseDto<List<ExpenseDto>>.Success(200,subscriptions));
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTotalExpenses(int userId)
        {
            var totalExpenses = await _subscriptionService.GetTotalExpenses(userId);
            return CreateActionResult(CustomResponseDto<TotalExpenseDto>.Success(200, totalExpenses));
        }
        //[HttpPost("[action]")]
        //public async Task<IActionResult> AddSubscription(AddSubscriptionDto subscriptionDto)
        //{
        //    await _subscriptionService.AddAsync(_mapper.Map<Subscription>(subscriptionDto));
        //    return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        //}

        [HttpPost]
        public async Task<IActionResult> AddSubscription(AddSubscriptionDto subscriptionDto)
        {
            if (await _subscriptionService.AnyAsync(x => x.PackageId == subscriptionDto.PackageId && x.UserId == subscriptionDto.UserId))
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(400, "Already added"));
            }
            await _subscriptionService.AddAsync(_mapper.Map<Subscription>(subscriptionDto));
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201,"Subscription Added"));
        }
        [HttpPut("")]
        public async Task<IActionResult> UpdateSubscription(AddSubscriptionDto subscriptionDto)
        {
            await _subscriptionService.UpdateAsync(_mapper.Map<Subscription>(subscriptionDto));
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204,"Subscription Updated"));
        }

        [HttpDelete("{subscriptionId}")]
        public async Task<IActionResult> DeleteSubscription(int subscriptionId)
        {
            var subscription = await _subscriptionService.GetByIdAsync(subscriptionId);
            await _subscriptionService.RemoveAsync(subscription);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204));
        }

        [HttpGet("{subscriptionId}")]
        public async Task<IActionResult> GetBySubscriptionId(int subscriptionId)
        {
            var subscriptions = await _subscriptionService.GetBySubscriptionId(subscriptionId);
            return CreateActionResult(CustomResponseDto<SubscriptionDto>.Success(200, subscriptions));
        }

    }
}
