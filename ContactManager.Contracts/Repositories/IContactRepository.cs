using ContactManager.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Contracts.Repositories
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAllContacts();
        Contact GetContactById(long id);
        void Create(Contact contact);
        void Update(Contact dbContact, Contact contact);
        void Delete(Contact contact);
        IEnumerable<Contact> Search(string text);
    }
}
