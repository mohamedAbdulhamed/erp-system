using ManagementSystem.Dtos.Supplier;
using ManagementSystem.Models;
using Mapster;

namespace ManagementSystem.Profiles
{
    public class SupplierProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<CreateSupplierRequest,Supplier>();
            config.NewConfig<UpdateSupplierRequest,Supplier>();
        }
    }
}
