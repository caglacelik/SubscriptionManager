using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IPackageService : IService<Package>
    {
        Task<List<PackageDto>> GetPackagesWithProductId(int productId);
        Task<PackageDto> GetById(int packageId);
    }
}
