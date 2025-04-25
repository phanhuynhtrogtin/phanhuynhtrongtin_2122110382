
<<<<<<< HEAD
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
using phanhuynhtrongtin_2122110382.DTO;
=======
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phanhuynhtrongtin_2122110382.Data;
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
using phanhuynhtrongtin_2122110382.Model;

namespace phanhuynhtrongtin_2122110382.Controllers
{
<<<<<<< HEAD
   
=======
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
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
<<<<<<< HEAD
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories(int page = 1, int pageSize = 10)
        {
            var categories = await _context.Categories
                                           .Skip((page - 1) * pageSize)
                                           .Take(pageSize)
                                           .ToListAsync();

            return Ok(categories);
        }


=======
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);  // Return a list of categories
        }

>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
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
<<<<<<< HEAD
        public async Task<ActionResult<Category>> PostCategory([FromBody] CategoryDTO categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest();
            }

            var category = new Category
            {
                Cat_Name = categoryDto.Cat_Name,
                Image = categoryDto.Image
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Cat_Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] CategoryDTO categoryDto)
        {
            if (id != categoryDto.Cat_Id)
            {
                return BadRequest("Category ID does not match the provided category ID.");
            }

            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            existingCategory.Cat_Name = categoryDto.Cat_Name;
            existingCategory.Image = categoryDto.Image;

            try
            {
                _context.Entry(existingCategory).State = EntityState.Modified;
=======
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
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
<<<<<<< HEAD
                if (!_context.Categories.Any(c => c.Cat_Id == id))
                {
                    return NotFound($"Category with ID {id} not found.");
=======
                if (!CategoryExists(id))
                {
                    return NotFound();  // Return 404 if the category does not exist
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
                }
                else
                {
                    throw;
                }
            }

<<<<<<< HEAD
            return NoContent();
=======
            return NoContent();  // Return 204 if update is successful
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
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
<<<<<<< HEAD
            return _context.Categories.Any(e => e.Cat_Id == id);
=======
            return _context.Categories.Any(e => e.Id == id);
>>>>>>> 5b990030e76124dbdc472c9728fc1284ec006a36
        }
    }
}