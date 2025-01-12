using ManagementSystem.Dtos.CustomerOrderTransaction;
using ManagementSystem.Models;
using Mapster;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ManagementSystem.Profiles
{
    public class CustomerOrderTransactionProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UpdateCustomerOrderTransactionRequest, CustomerOrderTransaction>();
            config.NewConfig<CreateCustomerOrderTransactionRequest,CustomerOrderTransaction>();
            
        }
    }
}
