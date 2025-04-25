<<<<<<< HEAD
﻿using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.Model
{
    public class Product
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

        // Liên kết với Category thông qua khóa ngoại Cat_Id
        public Category Category { get; set; }
=======
﻿namespace phanhuynhtrongtin_2122110382.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image{ get; set; }
        public string Price { get; set; }
       
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
    }
}
