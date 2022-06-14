﻿using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IProductService : IService<Product>
    {
        Task<List<ProductDto>> GetProductsWithCategory(string categoryName);
    }
}
