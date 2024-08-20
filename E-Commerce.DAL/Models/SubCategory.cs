﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

using Microsoft.EntityFrameworkCore;

namespace E_Commerce.DAL.Models;

[Table("SubCategory")]
public partial class SubCategory
{
    [Key]
    public int SubCatId { get; set; }

    [Required]
    [StringLength(100)]
    public string SubCatName { get; set; }

    public bool IsActive { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreatedDate { get; set; }

    public int CategoryId { get; set; }

    [JsonIgnore]

    [ForeignKey("CategoryId")]
    [InverseProperty("SubCategories")]
    public virtual Category Category { get; set; }


    [JsonIgnore]

    [InverseProperty("SubCat")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}