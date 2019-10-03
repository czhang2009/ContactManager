using ContactManager.Contracts.Repositories;
using ContactManager.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ContactManager.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T: class
    {
        protected ContactManagerContext ContactManagerContext { get; set; }

        public RepositoryBase(ContactManagerContext context)
        {
            this.ContactManagerContext = context;
        }

        public void Create(T entity)
        {
            this.ContactManagerContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            this.ContactManagerContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll()
        {
            return this.ContactManagerContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.ContactManagerContext.Set<T>().Where(expression).AsNoTracking();
        }

        public void Update(T entity)
        {
            this.ContactManagerContext.Set<T>().Update(entity);
        }
    }
}
