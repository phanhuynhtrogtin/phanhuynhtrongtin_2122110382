using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
using phanhuynhtrongtin_2122110382.Controllers;

namespace phanhuynhtrongtin_2122110382.Model
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        // FK to User
        public int UserId { get; set; }

        // Mối quan hệ nhiều-một với User
        [ForeignKey("UserId")]
        public User User { get; set; }
        public OrderDetail Detail { get; set; }
    }
}
