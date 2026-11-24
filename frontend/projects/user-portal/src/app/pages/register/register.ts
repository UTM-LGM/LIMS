import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { allCountries } from 'country-telephone-data';
import { AsYouType, CountryCode, isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { State, IState } from 'country-state-city';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @ViewChild('phoneWrapper') phoneWrapper!: ElementRef;
  @ViewChild('countryWrapper') countryWrapper!: ElementRef;

  myLesenNotice = false;
  isSubmitted = false;
  formError = '';

  isDialDropdownOpen = false;
  dialSearchQuery = '';

  isCountryDropdownOpen = false;
  countrySearchQuery = '';

  availableStates: IState[] = State.getStatesOfCountry('MY');

  countryList = allCountries
    .map((c: any) => ({
      name: c.name.replace(/\s*\(.*?\)\s*/g, '').trim(),
      code: `+${c.dialCode}`,
      iso: c.iso2.toUpperCase() as CountryCode,
      isoLower: c.iso2.toLowerCase()
    }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  get filteredDialCountries() {
    const q = this.dialSearchQuery.trim().toLowerCase();
    if (!q) return this.countryList;
    return this.countryList.filter(
      (c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.isoLower.includes(q)
    );
  }

  get filteredCountries() {
    const q = this.countrySearchQuery.trim().toLowerCase();
    if (!q) return this.countryList;
    return this.countryList.filter(
      (c: any) => c.name.toLowerCase().includes(q) || c.isoLower.includes(q)
    );
  }

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    selectedIso: 'MY' as CountryCode,
    selectedIsoLower: 'my',
    dialCode: '+60',
    contactNumber: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: '',
    state: '',
    country: 'Malaysia',
    password: '',
    confirmPassword: ''
  };

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (
      this.isDialDropdownOpen &&
      this.phoneWrapper &&
      !this.phoneWrapper.nativeElement.contains(event.target)
    ) {
      this.isDialDropdownOpen = false;
    }

    if (
      this.isCountryDropdownOpen &&
      this.countryWrapper &&
      !this.countryWrapper.nativeElement.contains(event.target)
    ) {
      this.isCountryDropdownOpen = false;
    }
  }

  toggleDialDropdown(event: Event) {
    event.stopPropagation();
    this.isDialDropdownOpen = !this.isDialDropdownOpen;
    this.isCountryDropdownOpen = false;
    if (this.isDialDropdownOpen) {
      this.dialSearchQuery = '';
    }
  }

  selectDialCountry(c: any) {
    this.formData.selectedIso = c.iso;
    this.formData.selectedIsoLower = c.isoLower;
    this.formData.dialCode = c.code;
    this.isDialDropdownOpen = false;
    this.reformatPhone();
  }

  toggleCountryDropdown(event: Event) {
    event.stopPropagation();
    this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    this.isDialDropdownOpen = false;
    if (this.isCountryDropdownOpen) {
      this.countrySearchQuery = '';
    }
  }

  selectCountry(c: any) {
    const prevIso = this.formData.selectedIso;
    this.formData.country = c.name;
    this.formData.selectedIso = c.iso;
    this.formData.selectedIsoLower = c.isoLower;
    this.formData.dialCode = c.code;
    this.isCountryDropdownOpen = false;

    if (prevIso !== c.iso) {
      this.availableStates = State.getStatesOfCountry(c.iso);
      this.formData.state = '';
    }
    this.reformatPhone();
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '').replace(/^0+/, '');

    if (this.formData.selectedIso === 'MY') {
      if (digits.startsWith('60')) {
        digits = digits.slice(2).replace(/^0+/, '');
      }
      if (digits.length > 0 && !/^[13-9]/.test(digits)) {
        digits = digits.slice(1);
      }
      digits = digits.slice(0, 10);
    } else {
      digits = digits.slice(0, 12);
    }

    const formatted = digits
      ? new AsYouType(this.formData.selectedIso).input(digits)
      : '';

    this.formData.contactNumber = formatted;
    input.value = formatted;
  }

  private reformatPhone() {
    const digits = this.formData.contactNumber.replace(/\D/g, '').replace(/^0+/, '');
    this.formData.contactNumber = digits
      ? new AsYouType(this.formData.selectedIso).input(digits)
      : '';
  }

  registerWithMyLesen() {
    this.myLesenNotice = true;
  }

  onCountryChange() {
    const matched = this.countryList.find((c: any) => c.name === this.formData.country);
    if (matched) {
      const prevIso = this.formData.selectedIso;
      this.formData.selectedIso = matched.iso;
      this.formData.selectedIsoLower = matched.isoLower;
      this.formData.dialCode = matched.code;

      if (prevIso !== matched.iso) {
        this.availableStates = State.getStatesOfCountry(matched.iso);
        this.formData.state = '';
      }
      this.reformatPhone();
    }
  }

  onSubmit() {
    if (
      !this.formData.firstName.trim() ||
      !this.formData.lastName.trim() ||
      !this.formData.email.trim() ||
      !this.formData.contactNumber.trim() ||
      !this.formData.company.trim() ||
      !this.formData.addressLine1.trim() ||
      !this.formData.postcode.trim() ||
      !this.formData.city.trim() ||
      !this.formData.state.trim() ||
      !this.formData.country.trim() ||
      !this.formData.password ||
      !this.formData.confirmPassword
    ) {
      this.formError = 'Please fill in all mandatory fields marked with (*).';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email.trim())) {
      this.formError = 'Please enter a valid email address.';
      return;
    }

    const digitsOnly = this.formData.contactNumber.replace(/\D/g, '');
    const fullNumber = `${this.formData.dialCode}${digitsOnly}`;
    if (!isValidPhoneNumber(fullNumber, this.formData.selectedIso) && !isPossiblePhoneNumber(fullNumber, this.formData.selectedIso)) {
      this.formError = `Please enter a valid ${this.formData.selectedIso} contact number.`;
      return;
    }

    if (this.formData.country === 'Malaysia' && !/^\d{5}$/.test(this.formData.postcode.trim())) {
      this.formError = 'Please enter a valid 5-digit Malaysian postcode.';
      return;
    }

    if (this.formData.password.length < 8) {
      this.formError = 'Password must be at least 8 characters long.';
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.formError = 'Passwords do not match. Please re-enter.';
      return;
    }

    this.formError = '';
    this.isSubmitted = true;
  }
}