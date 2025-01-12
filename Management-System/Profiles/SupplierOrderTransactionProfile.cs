using ManagementSystem.Dtos.SupplierOrderTransaction;
using ManagementSystem.Models;
using Mapster;

namespace ManagementSystem.Profiles
{
    public class SupplierOrderTransactionProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<CreateSupplierOrderTransactionRequest, SupplierOrderTransaction>();
            config.NewConfig<UpdateSupplierOrderTransactionRequest, SupplierOrderTransaction>();
        }
    }
}
