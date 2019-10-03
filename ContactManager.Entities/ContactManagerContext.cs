using ContactManager.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Entities
{
    public class ContactManagerContext : DbContext
    {
        public ContactManagerContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(new Contact
            {
                Id = 1,
                FirstName = "Charles",
                LastName = "Zhang"
            }, new Contact
            {
                Id = 2,
                FirstName = "Tom",
                LastName = "Zhang"
            });

            modelBuilder.Entity<EmailAddress>().HasData(
                 new EmailAddress { Id = 1, ContactId = 1, Type = EmailAddressType.Personal, Address = "czhang@personal.com" },
                 new EmailAddress { Id = 2, ContactId = 1, Type = EmailAddressType.Business, Address = "czhang@business.com" },
                 new EmailAddress { Id = 3, ContactId = 2, Type = EmailAddressType.Personal, Address = "tzhang@personal.com" },
                 new EmailAddress { Id = 4, ContactId = 2, Type = EmailAddressType.Business, Address = "tzhang@business.com" }
            );
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<EmailAddress> EmailAddresses { get; set; }
    }
}
