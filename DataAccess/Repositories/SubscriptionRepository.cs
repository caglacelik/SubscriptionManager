using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class SubscriptionRepository : GenericRepository<Subscription>, ISubscriptionRepository
    {
        IMapper _mapper;
        IPackageRepository packageRepository;
        public SubscriptionRepository(Context context, IPackageRepository packageRepository) : base(context)
        {
            this.packageRepository = packageRepository;
        }
        public async Task<List<ExpenseDto>> GetAllSubscriptionsByUserId(int userId)
        {
            return await _context.Subscriptions.Include(x => x.User).Where(x => x.UserId == userId && x.FinishDate > DateTime.Now).Select(x => new ExpenseDto
            {
                Id = x.Id,
                ProductName = x.Package.Product.Name,
                Price = Convert.ToDecimal(x.Package.Price),
                DueTime = (x.FinishDate - DateTime.Now).Days,
                PackageName = x.Package.Name
            }).ToListAsync();
        }
        public async Task<List<ExpenseDto>> GetSubscriptionsByCategory(int userId, string categoryName)
        { 
            return await _context.Subscriptions.Include(x=>x.Package).ThenInclude(x=>x.Product).ThenInclude(x=>x.Category).Include(x=>x.User).Where(x=>x.UserId==userId && x.Package.Product.Category.Name == categoryName && x.FinishDate > DateTime.Now).Select(x=> new ExpenseDto
            {     
                Id = x.Id,
                ProductName = x.Package.Product.Name,
                Price = Convert.ToDecimal(x.Package.Price),
                DueTime = (x.FinishDate - DateTime.Now).Days,
                PackageName = x.Package.Name
            }).ToListAsync();
    }
        public async Task<TotalExpenseDto> GetTotalExpenses(int userId)
        {

            TotalExpenseDto total = new TotalExpenseDto(await _context.Subscriptions.Include(x => x.User).Where(x => x.UserId == userId && x.FinishDate > DateTime.Now).Select(x => new ExpenseDto
            {
                Id = x.Id,
                ProductName = x.Package.Product.Name,
                Price = Convert.ToDecimal(x.Package.Price),
                DueTime = (x.FinishDate - DateTime.Now).Days,
                PackageName = x.Package.Name
            }).ToListAsync());

            return total;

        }
        public async Task<SubscriptionDto> GetBySubscriptionId(int subscriptionId)
        {
            return await _context.Subscriptions.Include(x => x.Package).ThenInclude(x => x.Product).ThenInclude(x => x.Category).Where(x => x.Id == subscriptionId && x.FinishDate > DateTime.Now).
                Select(x => new SubscriptionDto()
                {
                    Id = x.Id,
                    FinishDate = x.FinishDate.Date.ToString("yyyy-MM-dd"),
                    ProductName = x.Package.Product.Name,
                    CategoryName = x.Package.Product.Category.Name,
                    PackageName = x.Package.Name,
                    PackagePrice = x.Package.Price.ToString(),
                    PackageDescription = x.Package.Description,
                    Packages = x.Package.Product.Packages.ToList(),
            }).SingleOrDefaultAsync();
        }
        public async Task<List<ChartDto>> GetChartData()
        {
            return await _context.ChartDto.FromSqlRaw("GetChartData").ToListAsync();
        }
    }
}
