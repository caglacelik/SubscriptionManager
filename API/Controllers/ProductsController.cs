using AutoMapper;
using Core.DTOs;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IProductService _productService;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<ProductDto>>.Success(200, _mapper.Map<List<ProductDto>>(products.ToList())));
        }
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetById(int productId)
        {
            return CreateActionResult(CustomResponseDto<ProductDto>.Success(200, _mapper.Map<ProductDto>(await _productService.GetByIdAsync(productId))));
        }
    }
}
