using System.Linq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendence = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendence != null && hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }

                if (attendence != null && hostUsername != user.UserName)
                {
                    activity.Attendees.Remove(attendence);
                }

                if (attendence == null)
                {
                    attendence = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendence);
                }

                var results = await _context.SaveChangesAsync() > 0;

                return results ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}