
<<<<<<< HEAD
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using phanhuynhtrongtin_2122110382.Data;
    using phanhuynhtrongtin_2122110382.DTO;
    using phanhuynhtrongtin_2122110382.Model;

    namespace phanhuynhtrongtin_2122110382.Controllers
    {
       
        [Route("api/[controller]")]
        [ApiController]
        public class ProductController : ControllerBase
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;  // Inject AutoMapper

            public ProductController(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            // GET: api/product
            [HttpGet]
            public async Task<IActionResult> GetProducts()
            {
                var products = await _context.Products.ToListAsync();
                return Ok(products);  // Trả về danh sách sản phẩm
            }

            // GET: api/product/5
            [HttpGet("{id}")]
            public async Task<IActionResult> GetProductById(int id)
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound();  // Trả về 404 nếu không tìm thấy sản phẩm
                }
                return Ok(product);  // Trả về sản phẩm theo id
            }

            // POST: api/product
            [HttpPost]
            public async Task<IActionResult> CreateProduct([FromBody] ProductDTO productdto)
            {
                if (productdto == null)
                {
                    return BadRequest();  // Trả về lỗi nếu không có dữ liệu
                }

                // Ánh xạ từ ProductDTO sang Product
                var product = _mapper.Map<Product>(productdto);

                // Thêm sản phẩm vào cơ sở dữ liệu
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                // Trả về trạng thái Created với đường dẫn đến sản phẩm mới
                return CreatedAtAction(nameof(GetProductById), new { id = product.Product_Id }, product);
            }

            // PUT: api/product/5
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDTO productdto)
            {
                if (id != productdto.Product_Id)
                {
                    return BadRequest();  // Trả về lỗi nếu id không khớp
                }

                var existingProduct = await _context.Products.FindAsync(id);
                if (existingProduct == null)
                {
                    return NotFound();  // Trả về lỗi nếu sản phẩm không tồn tại
                }

                // Cập nhật thông tin sản phẩm
                existingProduct.Product_Name = productdto.Product_Name;
                existingProduct.Price = (int)productdto.Price;
                existingProduct.Image = productdto.Image;
                existingProduct.Update_at = DateTime.Now;

                await _context.SaveChangesAsync();

                return NoContent();  // Trả về 204 No Content khi cập nhật thành công
            }

            // DELETE: api/product/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteProduct(int id)
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound();  // Trả về lỗi nếu không tìm thấy sản phẩm
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return NoContent();  // Trả về 204 No Content khi xóa thành công
            }
            [HttpGet("{id}/image")]
            public IActionResult GetProductImage(int id)
            {
                // Đường dẫn tới thư mục chứa hình ảnh
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", $"{id}.jpg");

                if (!System.IO.File.Exists(imagePath))
                {
                    return NotFound(); // Trả về 404 nếu không tìm thấy hình ảnh
                }

                var image = System.IO.File.OpenRead(imagePath);
                return File(image, "image/jpeg"); // Trả về hình ảnh với content type là image/jpeg
            }
        }
    }
=======
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
using phanhuynhtrongtin_2122110382.Model;

namespace phanhuynhtrongtin_2122110382.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);  // Trả về danh sách sản phẩm
        }

        // GET: api/product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();  // Trả về 404 nếu không tìm thấy sản phẩm
            }
            return Ok(product);  // Trả về sản phẩm theo id
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();  // Trả về lỗi nếu không có dữ liệu
            }

            // Thêm sản phẩm vào cơ sở dữ liệu
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Trả về trạng thái Created với đường dẫn đến sản phẩm mới
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // PUT: api/product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();  // Trả về lỗi nếu id không khớp
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound();  // Trả về lỗi nếu sản phẩm không tồn tại
            }

            // Cập nhật thông tin sản phẩm
            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.Image = product.Image;
       
            await _context.SaveChangesAsync();

            return NoContent();  // Trả về 204 No Content khi cập nhật thành công
        }

        // DELETE: api/product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();  // Trả về lỗi nếu không tìm thấy sản phẩm
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();  // Trả về 204 No Content khi xóa thành công
        }
    }
}
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
