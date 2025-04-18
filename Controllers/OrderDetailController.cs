using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
using phanhuynhtrongtin_2122110382.DTO;
using phanhuynhtrongtin_2122110382.Mapping;
using phanhuynhtrongtin_2122110382.Model;

namespace phanhuynhtrongtin_2122110382.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;  // Inject AutoMapper

        public OrderDetailController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var details = await _context.OrderDetails
                .Select(od => new
                {
                    orderDetailId = od.OrderDetailId,
                    orderId = od.OrderId,
                    productId = od.ProductId
                })
                .ToListAsync();

            return Ok(details);
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var detail = await _context.OrderDetails
                .Where(od => od.OrderDetailId == id)
                .Select(od => new
                {
                    orderDetailId = od.OrderDetailId,
                    orderId = od.OrderId,
                    productId = od.ProductId
                })
                .FirstOrDefaultAsync();

            if (detail == null)
                return NotFound();

            return Ok(detail);
        }

        // POST: api/OrderDetail
        [HttpPost]
        public async Task<IActionResult> Create(OrderDetailDTO orderDetailDto)
        {
            // Ánh xạ DTO thành Entity
            var orderDetail = _mapper.Map<OrderDetail>(orderDetailDto);
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            // Trả về kết quả sau khi tạo thành công
            return CreatedAtAction(nameof(GetById), new { id = orderDetail.OrderDetailId }, orderDetail);
        }

        // PUT: api/OrderDetail/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OrderDetailDTO orderDetailDto)
        {
            if (id != orderDetailDto.OrderDetailId)
                return BadRequest();

            var orderDetail = _mapper.Map<OrderDetail>(orderDetailDto);
            _context.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.OrderDetails.Any(od => od.OrderDetailId == id))
                    return NotFound();

                throw;
            }
            return NoContent();
        }

        // DELETE: api/OrderDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail == null)
                return NotFound();

            _context.OrderDetails.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

