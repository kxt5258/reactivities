using System.IO.Compression;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities
{
    public class ActivityList
    {
        public class Query : IRequest<Result<List<ActivityDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}