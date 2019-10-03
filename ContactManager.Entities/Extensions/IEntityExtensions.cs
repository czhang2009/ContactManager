using System;
using System.Collections.Generic;
using System.Text;

namespace ContactManager.Entities.Extensions
{
    public static class IEntityExtensions
    {
        public static bool IsNull(this IEntity entity)
        {
            return entity == null;
        }

        public static bool IsEmpty(this IEntity entity)
        {
            return entity.Id.Equals(0);
        }
    }
}
