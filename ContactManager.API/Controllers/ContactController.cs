using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactManager.Contracts.Repositories;
using ContactManager.Contracts.Services;
using ContactManager.Entities.Extensions;
using ContactManager.Entities.Models;
using ContactManager.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactManager.API.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private ILoggerService _logger;
        private IContactService _contactService;

        public ContactController(ILoggerService logger, IContactService contactService)
        {
            _logger = logger;
            _contactService = contactService;
        }

        [HttpGet("search/{text}")]
        public IActionResult Search(string text)
        {
            try
            {
                var contacts = _contactService.Search(text);

                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in ContactController.Search({text}): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var contacts = _contactService.GetAll();

                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in ContactController.Get(): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            try
            {
                var contact = _contactService.Get(id);
                if (contact.IsEmpty())
                {
                    _logger.LogError($"Contact with id: {id}, is not found in db.");
                    return NotFound();
                }
                else
                {
                    return Ok(contact);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in ContactController.Get({id}): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]Contact contact)
        {
            try
            {
                if (contact.IsNull())
                {
                    _logger.LogError("contact object sent from client is null.");
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid contact object sent from client.");
                    return BadRequest("Invalid model object");
                }

                _contactService.Create(contact);

                return NoContent(); 
            }
            catch (Exception ex)
            {
                var json = JsonConvert.SerializeObject(contact);
                _logger.LogError($"Exception in ContactController.Post({json}): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody]Contact contact)
        {
            try
            {
                if (contact.IsNull())
                {
                    _logger.LogError("Contact object sent from client is null.");
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid contact object sent from client.");
                    return BadRequest("Invalid model object");
                }

                var status = _contactService.Update(contact);
                if(status == Entities.CRUDStatus.NotFound)
                {
                    _logger.LogError($"Contact with id: {id}, is not found in db.");
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                var json = JsonConvert.SerializeObject(contact);
                _logger.LogError($"Exception in ContactController.Put({json}): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                var status = _contactService.Delete(id);
                if (status == Entities.CRUDStatus.NotFound)
                {
                    _logger.LogError($"Contact with id: {id}, is not found in db.");
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in ContactController.Delete({id}): {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
