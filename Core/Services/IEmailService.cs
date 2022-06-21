using Core.DTOs;
using Core.Entities;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IEmailService 
    {
        public Task SendEmailAsync(MimeMessage mimeMessage);
        public Task<EmailDto> CreateMessageAsync(string email, TotalExpenseDto totalExpenseDto);
        public Task<MimeMessage> CreateMimeEmailAsync(EmailDto emailDto);
    }
}
