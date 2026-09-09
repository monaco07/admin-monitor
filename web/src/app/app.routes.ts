import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        canActivate: [authGuard],
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    }
];
