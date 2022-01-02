import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account-service';

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {

    constructor(private accountService: AccountService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const isInUrl = (text: string): boolean => state.url.includes(text);

        if (this.accountService.account == null) {
            if (isInUrl('personal') ||
                isInUrl('vaccinated/') ||
                isInUrl('hospital/') ||
                isInUrl('person') ||
                isInUrl('user-options')) {
                this.router.navigate(['access-denied'])
            } else {
                return true;
            }
        } else {
            if (this.accountService.account.id == 1) {
                return true;
            } else {
                if (isInUrl('hospital/') ||
                    isInUrl('personal/')) {
                    this.router.navigate(['access-denied'])
                }
                return true;
            }
        }
        return false;
    }
}
