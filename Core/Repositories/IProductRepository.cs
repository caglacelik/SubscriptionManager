using Core.Entities;
using System;
using System.Linq;
using System.Text;

namespace Core.Repositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<Product>> GetProductsWithCategory(string categoryName);
    }
}
