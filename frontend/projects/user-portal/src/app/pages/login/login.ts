import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  myLesenNotice = false;
  showPassword = false;
  formError = '';
  loginStatus: 'idle' | 'success' = 'idle';

  captchaToken = '';
  widgetId: number | null = null;

  // Kunci Ujian Rasmi Google reCAPTCHA v2 (Berfungsi di localhost tanpa daftar domain)
  private readonly siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  formData = {
    email: '',
    password: '',
    rememberMe: false
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.renderRecaptcha();
  }

  private renderRecaptcha() {
    if (typeof grecaptcha !== 'undefined' && grecaptcha.render && this.recaptchaContainer) {
      this.widgetId = grecaptcha.render(this.recaptchaContainer.nativeElement, {
        sitekey: this.siteKey,
        callback: (token: string) => {
          this.captchaToken = token;
          this.formError = '';
          this.cdr.detectChanges();
        },
        'expired-callback': () => {
          this.captchaToken = '';
          this.cdr.detectChanges();
        }
      });
    } else {
      // Cuba semula selepas 300ms jika skrip Google masih dimuatkan
      setTimeout(() => this.renderRecaptcha(), 300);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginWithMyLesen() {
    this.myLesenNotice = true;
  }

  onSubmit() {
    if (!this.formData.email.trim() || !this.formData.password) {
      this.formError = 'Please enter both your email address and password.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email.trim())) {
      this.formError = 'Please enter a valid email address.';
      return;
    }

    if (!this.captchaToken) {
      this.formError = 'Please complete the reCAPTCHA verification.';
      return;
    }

    this.formError = '';
    this.loginStatus = 'success';
  }

  resetDemo() {
    this.loginStatus = 'idle';
    this.captchaToken = '';
    setTimeout(() => this.renderRecaptcha(), 100);
  }
}