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
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(Context context) : base(context)
        {
        }
        public async Task<List<Product>> GetProductsWithCategory(string categoryName)
        {
            return await _context.Products.Include(x => x.Category).Where(x=>x.Category.Name == categoryName).ToListAsync();
        }
    }
}
