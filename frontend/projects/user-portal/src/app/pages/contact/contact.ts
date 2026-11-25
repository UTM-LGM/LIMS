import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  submitted = false;
  errorMessage = '';

  contactForm = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Technical Inquiry',
    message: ''
  };

  submitContact() {
    if (
      !this.contactForm.fullName.trim() ||
      !this.contactForm.email.trim() ||
      !this.contactForm.message.trim()
    ) {
      this.errorMessage = 'Please fill in your name, email address, and message.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactForm.email.trim())) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.errorMessage = '';
    this.submitted = true;
  }

  resetForm() {
    this.submitted = false;
    this.contactForm = {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      subject: 'General Technical Inquiry',
      message: ''
    };
  }
}