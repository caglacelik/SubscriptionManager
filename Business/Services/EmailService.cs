using Core.DTOs;
using Core.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Service.Exceptions;

namespace Service.Services
{
    public class EmailService : IEmailService
    {
        //Email: "SubsyManagement@outlook.com"
        //Password: "456987DS"
        //Host: "outlook.live.com"
        //Port: 587
        public Task<EmailDto> CreateMessageAsync(string email, TotalExpenseDto totalExpenseDto)
        {
            EmailDto emailDto= new EmailDto();
            emailDto.ToEmail = email;
            emailDto.Body = "You have " + totalExpenseDto.SubNumber.ToString() + " subscriptions.\n";
            foreach (var sub in totalExpenseDto.subscriptions)
            {
                string values = "\nName : " + sub.ProductName + " " + sub.PackageName + "\nPrice : " + sub.Price.ToString()
                    + "\nFinish Date : " + DateTime.Now.AddDays(sub.DueTime).ToString("dd/MM/yyyy").Replace('-', '/') + "\n";

                emailDto.Body = string.Concat(emailDto.Body, values);
            }
            string expenses = "\nMonthly Expense: " + totalExpenseDto.SubTotalMonth.ToString() +
                              "\nYearly Expense: " + totalExpenseDto.SubTotalYear.ToString() +
                              "\n\nThank you for choosing us \nAll best wishes!";
            emailDto.Body = string.Concat(emailDto.Body, expenses);
            return Task.FromResult(emailDto);
        }

        public Task<MimeMessage> CreateMimeEmailAsync(EmailDto emailDto)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("SubsyManagement@outlook.com"));
            email.To.Add(MailboxAddress.Parse(emailDto.ToEmail));
            email.Subject = "Hey, Check your recent expenses!";
            email.Body = new TextPart(TextFormat.Text) { Text = emailDto.Body };
            return Task.FromResult(email);
        }

        public async Task SendEmailAsync(MimeMessage mimeMessage)
        {
            using var smtp = new SmtpClient();
            try
            {
            await smtp.ConnectAsync("outlook.live.com", 587, SecureSocketOptions.StartTls);
            //smtp.AuthenticationMechanisms.Remove("XOAUTH2");
            await  smtp.AuthenticateAsync("SubsyManagement@outlook.com", "456987DS");
            await smtp.SendAsync(mimeMessage);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            finally
            {
            smtp.Disconnect(true);
            }
        }
    }
}
