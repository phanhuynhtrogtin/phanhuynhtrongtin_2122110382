    using System.ComponentModel.DataAnnotations;

    namespace phanhuynhtrongtin_2122110382.DTO
    {
    public class ProductDTO
    {
        public int Product_Id { get; set; }
        public string Product_Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public int Cat_Id { get; set; }  
    }

}
