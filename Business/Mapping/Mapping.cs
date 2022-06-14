using AutoMapper;
using Core.DTOs;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mapping
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<PackageDto, Package>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Subscription, SubscriptionDto>().ReverseMap();
            CreateMap<Subscription, AddSubscriptionDto>().ReverseMap();
            //.ForMember(x => x.ProductId, a => a.MapFrom(s => s.Package.ProductId))
            //CreateMap<Subscription, SubscriptionDto>()
            //    .ForMember(x => x.Id, a => a.MapFrom(s => s.Id))
            //    .ForMember(x => x.FinishDate, a => a.MapFrom(s => s.FinishDate))
            //    .ReverseMap();

            //CreateMap<User, SubscriptionDto>()
            //    .ForMember(x => x.UserId, a => a.MapFrom(s => s.Id))
            //    .ReverseMap();

            //CreateMap<(Category, Product), SubscriptionDto>()
            //    .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Item1.Name))
            //    .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Item2.Name))
            //    .ReverseMap();

            //CreateMap<Category, SubscriptionDto>()
            //    .ForMember(x => x.UserId, a => a.MapFrom(s => s.Item2.Id))
            //    .ForMember(x => x., a => a.MapFrom(s => s.Item1))
            //    .ReverseMap();
            //.ForMember(x => x.ProductId, a => a.MapFrom(s => s.Item1.Id))
            //.ForMember(x => x.ProductName, a => a.MapFrom(s => s.Item1.Name))
            //.ForMember(x => x.PackageName, a => a.MapFrom(s => s.Item2.Name))
            //.ForMember(x => x.PackagePrice, a => a.MapFrom(s => s.Item2.Price))
            //.ForMember(x => x.PackageDescription, a => a.MapFrom(s => s.Item2.Description))
            //.ForMember(x => x.CategoryName, a => a.MapFrom(s => s.Item3.Name))
            //CreateMap<Package, SubscriptionDto>()
            //    .ForMember(x => x.PackageName, a => a.MapFrom(s => s.Name))
            //    .ForMember(x => x.PackagePrice, a => a.MapFrom(s => s.Price))
            //    .ForMember(x => x.PackageDescription, a => a.MapFrom(s => s.Description))
            //    .ReverseMap();
            //CreateMap<Category, SubscriptionDto>()
            //    .ForMember(x => x.CategoryName, a => a.MapFrom(s => s.Name)).ReverseMap();
            //CreateMap<User, SubscriptionDto>()
            //    .ForMember(x => x.UserId, a => a.MapFrom(s => s.Id)).ReverseMap();
            //CreateMap<Subscription, ExpenseDto>()
            //    .ForMember(x=>x.Id, a=>a.MapFrom(s=>s.Id))
            //    .ForMember(x => x.ProductName, a=>a.MapFrom(s=>s.Package.Product.Name))
            //    .ReverseMap();
            //CreateMap<Product, ExpenseDto>()
            //    .ForMember(x => x.ProductName, a => a.MapFrom(s => s.Name)).ReverseMap();
            //CreateMap<Package, ExpenseDto>()
            //    .ForMember(x => x.PackageId, a => a.MapFrom(s => s.Id))
            //    .ForMember(x => x.Price, a => a.MapFrom(s => s.Price)).ReverseMap();
            //CreateMap<User, ExpenseDto>()
            //    .ForMember(x => x.UserId, a => a.MapFrom(s => s.Id)).ReverseMap();
            //CreateMap<User, TotalExpenseDto>()
            //    .ForMember(x=>x.Subscriptions, a=>a.MapFrom(s=>s.Subscriptions))
            //    .ForMember(x=>x.SubNumber, a=>a.MapFrom(s=> s.Subscriptions.ToList().Count))
            //    .ForMember(x=>x.SubTotalMonth, a=>a.MapFrom(s=>(s.Subscriptions.Select(x=>x.Package.Price)).Sum()))
            //    .ForMember(x => x.SubTotalYear, a => a.MapFrom(s => ((s.Subscriptions.Select(x => x.Package.Price)).Sum())*12))
            //    .ReverseMap();
        }

    }
}
