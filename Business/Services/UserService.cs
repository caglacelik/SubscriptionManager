using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Repositories;
using Core.Services;
using Core.UnitOfWork;
using Service.Services.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IGenericRepository<User> genericRepository, IUnitOfWork unitOfWork, IUserRepository userRepository, IMapper mapper) : base(genericRepository, unitOfWork)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<UserLoginDto> Login(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.Login(_mapper.Map<User>(userLoginDto));
            if (user == null)
            {
                throw new NotFoundException("User can not be found");
            }
            return _mapper.Map<UserLoginDto>(user);
        }
    }
}

