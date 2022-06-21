using Core.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Validations
{
    public class UserRegisterDtoValidator : AbstractValidator<UserRegisterDto>
    {
        public UserRegisterDtoValidator()
        {
        RuleFor(x => x.Email).NotNull().WithMessage("{PropertyName} is required").NotEmpty().WithMessage("{PropertyName} is required").EmailAddress();
        RuleFor(x => x.Password).NotEmpty().WithMessage("{PropertyName} is required").NotEmpty().WithMessage("{PropertyName} is required").MinimumLength(8).WithMessage("{PropertyName} can not be shorter than 8 characters");
        RuleFor(x => x.PhoneNumber).MaximumLength(10).WithMessage("{PropertyName} should be 10 characters").MinimumLength(10).WithMessage("{PropertyName} should be 10 characters");

        }
    }
}
