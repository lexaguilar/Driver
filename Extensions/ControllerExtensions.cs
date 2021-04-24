using System;
using System.Linq;
using System.Security.Claims;
using Driver.Models;
using Driver.Services;
using Microsoft.AspNetCore.Mvc;

namespace Driver.Extensions
{
    public static class ControllerExtensions
    {
        internal static AppUser GetAppUser(this Controller controller)
        {
            AppUser usr = new AppUser();
            var identity = controller.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                foreach (var c in identity.Claims)
                {
                    switch (c.Type)
                    {
                        case ClaimTypes.NameIdentifier:
                            usr.Username = c.Value;
                            break;                    
                        case AppClaimTypes.AreaId:
                            usr.AreaId = Convert.ToInt32(c.Value);
                            break;
                        case AppClaimTypes.RolId:
                            usr.RolId = Convert.ToInt32(c.Value);
                            break;
                    }
                }
            }           

            return usr;
        }
    }
}