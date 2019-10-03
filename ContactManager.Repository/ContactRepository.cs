using ContactManager.Contracts.Repositories;
using ContactManager.Entities;
using ContactManager.Entities.Extensions;
using ContactManager.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ContactManager.Repository
{
    public class ContactRepository : RepositoryBase<Contact>, IContactRepository
    {
        public ContactRepository(ContactManagerContext context) : base(context)
        {}

        public IEnumerable<Contact> GetAllContacts()
        {
            return FindAll().Include(contact => contact.EmailAddresses).OrderBy(o => o.FirstName).ToList();
        }

        public Contact GetContactById(long id)
        {
            return FindByCondition(contact => contact.Id.Equals(id))
                .Include(contact => contact.EmailAddresses)
                //.DefaultIfEmpty(new Contact() { EmailAddresses = new List<EmailAddress>() })
                .FirstOrDefault();
        }

        public IEnumerable<Contact> Search(string text)
        {
            return FindByCondition(contact => contact.FirstName.Contains(text) || contact.LastName.Contains(text))
            .Include(contact => contact.EmailAddresses)
            .OrderBy(o => o.FirstName).ToList();
        }

        public void Update(Contact dbContact, Contact contact)
        {
            dbContact.Map(contact);
            Update(dbContact);
        }
    }
}
