﻿using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.DTO
{
    public class ProductDTO
    {
        [Key]
        public int Product_Id { get; set; }

        public string Product_Name { get; set; }

        // Thêm Cat_Id làm khóa ngoại
        public int Cat_Id { get; set; }

        public string Image { get; set; }

        public int Price { get; set; }

        public DateTime Create_at { get; set; }

        public DateTime? Update_at { get; set; }

        public DateTime? Delete_at { get; set; }
    }
}
