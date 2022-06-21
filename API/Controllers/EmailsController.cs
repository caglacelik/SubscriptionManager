using AutoMapper;
using Core.DTOs;
using Core.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

namespace API.Controllers
{
    public class EmailsController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly ISubscriptionService _subscriptionService;
        private readonly IUserService _userService;

        public EmailsController(IMapper mapper, IEmailService emailService, ISubscriptionService subscriptionService, IUserService userService)
        {
            _mapper = mapper;
            _emailService = emailService;
            _subscriptionService = subscriptionService;
            _userService = userService;
        }
        [HttpPost("{userId}")]
        public async Task<IActionResult> SendEmailAsync(int userId)
        {
            var user = await _userService.GetByIdAsync(userId);
            var totalExpense = await _subscriptionService.GetTotalExpenses(userId);
            var emailDto = await _emailService.CreateMessageAsync(user.Email,totalExpense);
            var mimeMessage = await _emailService.CreateMimeEmailAsync(emailDto);
            await _emailService.SendEmailAsync(mimeMessage);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200, "Email sent. Check your mailbox."));
        }
    }
}
