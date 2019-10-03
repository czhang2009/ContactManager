using ContactManager.Entities;
using ContactManager.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Contracts.Services
{
    public interface IContactService
    {
        Contact Get(long id);
        IEnumerable<Contact> GetAll();
        void Create(Contact contact);
        CRUDStatus Update(Contact contact);
        CRUDStatus Delete(long id);
        IEnumerable<Contact> Search(string text);
    }
}
