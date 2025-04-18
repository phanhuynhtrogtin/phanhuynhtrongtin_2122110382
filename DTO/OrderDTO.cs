using System.ComponentModel.DataAnnotations;

namespace phanhuynhtrongtin_2122110382.DTO
{
    public class OrderDTO
    {
        [Key]
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

      
        public int UserId { get; set; }

    }
}