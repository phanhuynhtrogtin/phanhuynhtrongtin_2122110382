using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.DTO
{
    public class OrderDetailDTO
    {
        [Key]
        public int OrderDetailId { get; set; }

        public int OrderId { get; set; }  // Khóa ngoại liên kết với Order
        public int ProductId { get; set; } // Khóa ngoại liên kết với Product

        public int Quantity { get; set; }  // Số lượng sản phẩm trong đơn hàng
        public decimal Price { get; set; } // Giá của sản phẩm trong đơn hàng
    }
}
