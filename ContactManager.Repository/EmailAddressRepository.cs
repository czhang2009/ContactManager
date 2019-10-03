using ContactManager.Contracts.Repositories;
using ContactManager.Entities;
using ContactManager.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Repository
{
    public class EmailAddressRepository : RepositoryBase<EmailAddress>, IEmailAddressRepository
    {
        public EmailAddressRepository(ContactManagerContext context) : base(context)
        { }

    }
}

