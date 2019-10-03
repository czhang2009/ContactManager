using ContactManager.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Entities.Extensions
{
    public static class ContactExtensions
    {
        public static void Map(this Contact dbContact, Contact contact)
        {
            dbContact.FirstName = contact.FirstName;
            dbContact.LastName = contact.LastName;
        }
    }
}
