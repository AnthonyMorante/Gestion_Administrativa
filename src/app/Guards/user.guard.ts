import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AxiosService } from '../Services/axios.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AxiosService);
  const router = inject(Router);
  const path = route.routeConfig?.path?.toLocaleLowerCase() || "";
  if (await authService.validateToken()) {
    return path.includes("login") ? router.navigate(['Inicio']) : true;
  } else {
    return path.includes("login") ? true : router.navigate(["login"]);
  }
};
