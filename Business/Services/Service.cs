using Core.Entities;
using Core.Repositories;
using Core.Services;
using Core.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Service.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class Service<T> : IService<T> where T : class
    {
        private readonly IGenericRepository<T> _genericRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Service(IGenericRepository<T> genericRepository, IUnitOfWork unitOfWork)
        {
            this._genericRepository = genericRepository;
            this._unitOfWork = unitOfWork;
        }

        public async Task AddAsync(T entity)
        {
            await _genericRepository.AddAsync(entity);
            await _unitOfWork.CommitAsync();
        }
        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await _genericRepository.AnyAsync(expression);
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var hasEntities = await _genericRepository.GetAll().ToListAsync();
            if (hasEntities == null)
            throw new NotFoundException("not found");

            return hasEntities;
        }
        public async Task<T> GetByIdAsync(int id)
        {
            var hasEntity = await _genericRepository.GetByIdAsync(id);

            if (hasEntity == null)
            throw new NotFoundException("Not found");

            return hasEntity;
        }
        public async Task RemoveAsync(T entity)
        {
             _genericRepository.Remove(entity);
            await _unitOfWork.CommitAsync();
        }
        public async Task UpdateAsync(T entity)
        {
             _genericRepository.Update(entity);
            await _unitOfWork.CommitAsync();
        }
        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return _genericRepository.Where(expression);
        }
    }
}
