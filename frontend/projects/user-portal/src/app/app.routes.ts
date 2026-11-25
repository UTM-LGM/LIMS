import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { CustomerLayout } from './layout/customer-layout/customer-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Products } from './pages/products/products';
import { Contact } from './pages/contact/contact';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Inquiry } from './pages/portal/inquiry/inquiry';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'products', component: Products },
      { path: 'contact', component: Contact },
      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: 'forgot-password', component: ForgotPassword }
    ]
  },
  {
    path: 'portal',
    component: CustomerLayout,
    children: [
      { path: '', redirectTo: 'inquiry', pathMatch: 'full' },
      { path: 'inquiry', component: Inquiry },
      { path: 'registration', component: Inquiry }, // placeholder sementara
      { path: 'payment', component: Inquiry },      // placeholder sementara
      { path: 'status', component: Inquiry },       // placeholder sementara
      { path: 'dashboard', component: Inquiry }     // placeholder sementara
    ]
  },
  { path: '**', redirectTo: '' }
];