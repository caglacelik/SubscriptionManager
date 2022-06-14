﻿using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class SubscriptionDto 
    {
        public int Id { get; set; }
        //public int UserId { get; set; }
        public List<Package> Packages { get; set; }
        //public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public DateTime FinishDate { get; set; }
        public string PackageName { get; set; }
        public string PackagePrice { get; set; }
        public string PackageDescription { get; set; }

        //public SubscriptionDto()
        //{
        //    Packages.FirstOrDefault().ProductId = ProductId;
        //}
    }
}
