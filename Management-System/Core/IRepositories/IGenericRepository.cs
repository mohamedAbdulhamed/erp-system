using System.Linq.Expressions;

namespace ManagementSystem.Core.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes);
        Task<T?> GetByIdAsync(int id);
        Task<T?> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes);
        Task<T?> FindAsync(Expression<Func<T, bool>> criteria);
        Task<T?> FindAsync(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> criteria);
        Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
        Task<bool> AddAsync(T entity);
        bool Update(T entity);
        Task<bool> DeleteAsync(int id);
    }

}