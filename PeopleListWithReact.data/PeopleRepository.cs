using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleListWithReact.Data
{
    public class PeopleRepository
    {
        private string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public Person GetById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }
        public void DeleteAll()
        {
            using var context = new PeopleDataContext(_connectionString);

            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Checked ='true'");
            context.SaveChanges();
        }
        public void UpdateAll(List <Person> people)
        {
            using var context = new PeopleDataContext(_connectionString);

            foreach (Person person in people)
            {
                context.Entry(people).CurrentValues.SetValues(person);
            }
        context.SaveChanges();
        }
    }
}