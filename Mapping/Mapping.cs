using phanhuynhtrongtin_2122110382.DTO;
using phanhuynhtrongtin_2122110382.Model;
using phanhuynhtrongtin_2122110382.Controllers;
using AutoMapper;

using static System.Runtime.InteropServices.JavaScript.JSType;

namespace phanhuynhtrongtin_2122110382.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Ánh xạ từ ProductDTO sang Product
            CreateMap<ProductDTO, Product>();

            // Ánh xạ từ Product sang ProductDTO
            CreateMap<Product, ProductDTO>();

            // Ánh xạ từ OrderDTO sang Order
            CreateMap<OrderDTO, Order>();

            // Ánh xạ từ Order sang OrderDTO
            CreateMap<Order, OrderDTO>();

            // Ánh xạ từ UserDTO sang User
            CreateMap<UserDTO, User>();

            // Ánh xạ từ User sang UserDTO
            CreateMap<User, UserDTO>();

            // Ánh xạ từ OrderDetailDTO sang OrderDetail
            CreateMap<OrderDetailDTO, OrderDetail>();

            // Ánh xạ từ OrderDetail sang OrderDetailDTO
            CreateMap<OrderDetail, OrderDetailDTO>();
        }
    }
}
