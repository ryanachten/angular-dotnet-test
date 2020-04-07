using AngularDotnet.API.DTOs;
using AngularDotnet.API.Models;
using AutoMapper;

namespace AngularDotnet.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
        }
    }
}