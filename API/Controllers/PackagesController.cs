using AutoMapper;
using Core.DTOs;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IPackageService _packageService;

        public PackagesController(IPackageService packageService, IMapper mapper)
        {
            _packageService = packageService;
            _mapper = mapper;
        }
        [HttpGet("[action]/{productId}")]
        public async Task<IActionResult> GetPackagesWithProductId(int productId)
        {
            var packages = await _packageService.GetPackagesWithProductId(productId);
            //var packagesDto = _mapper.Map<List<PackageDto>>(packages.ToList());
            return CreateActionResult(CustomResponseDto<List<PackageDto>>.Success(200, packages));
        }
        [HttpGet("[action]/{packageId}")]
        public async Task<IActionResult> GetById(int packageId)
        {
            var package = await _packageService.GetById(packageId);

            return CreateActionResult(CustomResponseDto<PackageDto>.Success(200, package));
        }
    }
}
