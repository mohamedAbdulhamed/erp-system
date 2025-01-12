using ManagementSystem.Dtos.Customer;
using ManagementSystem.Models;
using Mapster;

namespace ManagementSystem.Profiles
{
    public class CustomerProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
         
            config.NewConfig<CreateCustomerRequest, Customer>()
                .TwoWays()
                .Map(dest => dest.CustomerName, src => src.CustomerName)  // Map CustomerName
                .Map(dest => dest.PhoneNumber, src => src.PhoneNumber)    // Map PhoneNumber
                .Map(dest => dest.Address, src => src.Address)            // Map Address
                .Ignore(dest => dest.CustomerID)                          // Ignore CustomerID (database-generated)
                .Ignore(dest => dest.IsActive)                            // Keep default IsActive value
                .Ignore(dest => dest.CustomerBalance)                     // Ignore navigation properties
                .Ignore(dest => dest.CustomerOrders)
                .Ignore(dest => dest.CustomerOrderTransactions);

            config.NewConfig<Customer, CustomerResponse>()
                .Map(dest => dest.CustomerName, src => src.CustomerName)
                .Map(dest => dest.PhoneNumber, src => src.PhoneNumber)
                .Map(dest => dest.IsActive, src => src.IsActive);
                
            }
          
        }
    }

