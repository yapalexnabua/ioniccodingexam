import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { AppState } from '../interfaces/AppState';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private user$ = this.store.select(selectUser);

    constructor(private router: Router, private store: Store<AppState>, private alertCtrl: AlertController) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const expectedRole = route.data['role'] || null;

        return this.user$.pipe(
            filter(val => val !== null), // Filter out initial Behaviour subject value
            take(1),
            map(user => {
                if (!user) {
                    this.showAlert();
                    return false;
                }

                let role = user['role'];

                if (!expectedRole || expectedRole === role) {
                    return true;
                }

                this.showAlert();
                return false;
            })
        );
    }
  
    async showAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You are not authorized to visit that page!',
            buttons: ['OK']
        });

        await alert.present();
    }
}
