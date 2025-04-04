
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
using phanhuynhtrongtin_2122110382.Model;

namespace phanhuynhtrongtin_2122110382.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Constructor injection to get the DbContext
        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);  // Return a list of categories
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();  // Return 404 if category not found
            }

            return Ok(category);  // Return the category if found
        }

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest();  // Return 400 if category is invalid
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();  // Return 400 if the category id doesn't match
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();  // Return 404 if the category does not exist
                }
                else
                {
                    throw;
                }
            }

            return NoContent();  // Return 204 if update is successful
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();  // Return 404 if the category not found
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();  // Return 204 if deletion is successful
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}