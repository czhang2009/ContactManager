using ContactManager.Contracts.Repositories;
using ContactManager.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ContactManagerContext _context;
        private IContactRepository _contact;
        private IEmailAddressRepository _emailAddress;

        public UnitOfWork(ContactManagerContext context)
        {
            _context = context;
        }

        public IContactRepository Contact
        {
            get
            {
                if (_contact == null)
                {
                    _contact = new ContactRepository(_context);
                }

                return _contact;
            }
        }

        public IEmailAddressRepository EmailAddress
        {
            get
            {
                if (_emailAddress == null)
                {
                    _emailAddress = new EmailAddressRepository(_context);
                }

                return _emailAddress;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
