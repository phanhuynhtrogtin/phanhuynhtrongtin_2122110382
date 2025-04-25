using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.Model
{
    public class Category
    {
        [Key]
        public int Cat_Id { get; set; }

        public string Cat_Name { get; set; }

        public string Image { get; set; }

        // Mối quan hệ One-to-Many: Một Category có nhiều Product
        public ICollection<Product> Products { get; set; }
    }
}
