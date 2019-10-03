using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Contracts.Repositories
{
    public interface IUnitOfWork
    {
        IContactRepository Contact { get; }
        IEmailAddressRepository EmailAddress { get; }
        void Save();
    }
}
