import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:"List/:userId" , component:HomeComponent , },
    {path:"",component:LoginComponent}
    
];
