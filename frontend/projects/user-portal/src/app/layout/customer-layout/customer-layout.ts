import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './customer-layout.html',
  styleUrl: './customer-layout.css'
})
export class CustomerLayout {
  userId = 'MKH';

  menuItems = [
    { label: 'Inquiry / Get Quote', route: '/portal/inquiry', icon: '📄' },
    { label: 'Registration', route: '/portal/registration', icon: '🪪' },
    { label: 'Payment', route: '/portal/payment', icon: '💳' },
    { label: 'Status', route: '/portal/status', icon: '🔄' },
    { label: 'Dashboard', route: '/portal/dashboard', icon: '📊' }
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}