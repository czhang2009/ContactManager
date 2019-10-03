using ContactManager.Contracts.Repositories;
using ContactManager.Contracts.Services;
using ContactManager.Entities;
using ContactManager.Entities.Extensions;
using ContactManager.Entities.Models;
using ContactManager.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Services
{
    public class ContactService : IContactService
    {
        private IUnitOfWork _uow;
        public ContactService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Contact Get(long id)
        {
            return _uow.Contact.GetContactById(id);
        }

        public IEnumerable<Contact> GetAll()
        {
            return _uow.Contact.GetAllContacts();
        }

        public IEnumerable<Contact> Search(string text)
        {
            return _uow.Contact.Search(text);
        }

        public void Create(Contact contact)
        {
            _uow.Contact.Create(contact);
            _uow.Save();
        }

        public CRUDStatus Update(Contact contact)
        {
            var dbContact = _uow.Contact.GetContactById(contact.Id);
            if (dbContact.IsNull())
                return CRUDStatus.NotFound;

            dbContact.EmailAddresses.ForEach(e => _uow.EmailAddress.Delete(e));
            contact.EmailAddresses.ForEach(e => _uow.EmailAddress.Create(e));

            _uow.Contact.Update(dbContact, contact);
            _uow.Save();

            return CRUDStatus.Success;
        }

        public CRUDStatus Delete(long id)
        {
            var dbContact = _uow.Contact.GetContactById(id);
            if (dbContact.IsEmpty())
                return CRUDStatus.NotFound;

            _uow.Contact.Delete(dbContact);
            _uow.Save();
            return CRUDStatus.Success;
        }
    }
}
