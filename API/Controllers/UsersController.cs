using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> GetById(int userId)
        {
            var user =await _userService.GetByIdAsync(userId);
            var userDto = _mapper.Map<UserDto>(user);
            return CreateActionResult(CustomResponseDto<UserDto>.Success(200, userDto));
        }

        //[HttpPost("[action]")]
        //public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        //{
        //    await _userService.Login(userLoginDto);
        //    return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        //}

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var user = await _userService.Login(userLoginDto);
            return CreateActionResult(CustomResponseDto<UserLoginDto>.Success(200, user));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            if (await _userService.AnyAsync(x => x.Email == userDto.Email && x.PhoneNumber == userDto.PhoneNumber))
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(400, "User already registered"));
            }
            await _userService.AddAsync(_mapper.Map<User>(userDto));
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201, "Registiration succesfully"));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(UserDto userDto)
        {
            await _userService.UpdateAsync(_mapper.Map<Core.Entities.User>(userDto));
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204, "User information updated"));
        }
    }
}

