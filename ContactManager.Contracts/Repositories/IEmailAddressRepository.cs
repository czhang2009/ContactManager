using ContactManager.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Contracts.Repositories
{
    public interface IEmailAddressRepository
    {
        void Create(EmailAddress emailAddress);
        void Delete(EmailAddress emailAddress);
    }
}
