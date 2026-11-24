import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  formError = '';
  isSubmitted = false;

  onSubmit() {
    if (!this.email.trim()) {
      this.formError = 'Please enter your registered email address.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.formError = 'Please enter a valid email address.';
      return;
    }

    this.formError = '';
    this.isSubmitted = true;
  }

  resetForm() {
    this.isSubmitted = false;
    this.email = '';
    this.formError = '';
  }
}