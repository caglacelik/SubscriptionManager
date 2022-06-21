using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Repositories;
using Core.Services;
using Core.UnitOfWork;
using Service.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class PackageService : Service<Package>, IPackageService
    {
        private readonly IPackageRepository _packageRepository;
        private readonly IMapper _mapper;
        public PackageService(IGenericRepository<Package> genericRepository, IUnitOfWork unitOfWork, IPackageRepository packageRepository, IMapper mapper) : base(genericRepository, unitOfWork)
        {
            _packageRepository = packageRepository;
            _mapper = mapper;
        }


        public async Task<List<PackageDto>> GetPackagesWithProductId(int productId)
        {
            var packages = await _packageRepository.GetPackagesWithProductId(productId);

            if(!packages.Any())
            throw new NotFoundException("not found");

            return packages;
        }

        public async Task<PackageDto> GetById(int packageId)
        {
            return await _packageRepository.GetById(packageId);
        }

    }
}
