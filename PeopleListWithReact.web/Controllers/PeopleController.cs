using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleListWithReact;
using PeopleListWithReact.Data;

namespace PeopleListWithReact.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
    
            private string _connectionString;

            public PeopleController(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("ConStr");
            }

            [Route("getall")]
            public List<Person> GetAll()
            {
                var repo = new PeopleRepository(_connectionString);
                return repo.GetAll();
            }

            [Route("add")]
            [HttpPost]
            public void Add(Person person)
            {
                var repo = new PeopleRepository(_connectionString);
                repo.Add(person);
            
            }
        [Route("edit")]
        [HttpPost]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.UpdatePerson(person);

        }
        [Route("editAll")]
        [HttpPost]
        public void EditPeople(List<Person> people)
        {
            var repo = new PeopleRepository(_connectionString);
            people.ForEach(p => repo.UpdatePerson(p));

        }
        [Route("delete")]
        [HttpPost]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);

        }
        [Route("deleteAll")]
        [HttpPost]
        public void DeleteAll(List<Person> people)
        {
          
            var repo = new PeopleRepository(_connectionString);
            people.ForEach(p => repo.UpdatePerson(p));
            //repo.UpdateAll(people);
            repo.DeleteAll();

        }

    }
    }