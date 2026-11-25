import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

interface TestCatalogItem {
  id: number;
  parameter: string;
  testMethod: string;
  sampleType: string;
  charge: number;
  selected?: boolean;
}

interface InquiryRow {
  parameter: string;
  testMethod: string;
  charge: number;
  qty: number;
}

@Component({
  selector: 'app-inquiry',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './inquiry.html',
  styleUrl: './inquiry.css'
})
export class Inquiry {
  services = [
    'Testing & Calib.',
    'Product Cert',
    'Proficiency Testing',
    'Reference Material',
    'Lab Inspectorate',
    'Consultancy'
  ];
  selectedService = 'Testing & Calib.';

  sampleTypes = ['Glove', 'Natural Rubber Latex', 'Standard Malaysian Rubber (SMR)', 'Rubber Compound', 'Tyre & Automotive'];
  selectedSampleType = 'Glove';

  // Simulasi pengguna tempatan vs luar negara (untuk paparan RM / USD)
  isOverseasUser = false;
  readonly usdRate = 0.22;

  // Jadual utama parameter dipilih
  inquiryRows: InquiryRow[] = [];

  // Bahagian Additional Section (Others)
  othersSpecify = '';
  selectedFileName = '';
  toastMessage = '';

  // Modal Item Lookup (5.1.1)
  isLookupOpen = false;
  lookupFilter = {
    parameter: '',
    testMethod: '',
    sampleType: ''
  };

  catalogItems: TestCatalogItem[] = [
    { id: 1, parameter: 'Tensile Strength & Elongation at Break', testMethod: 'ASTM D412 / ISO 37', sampleType: 'Glove', charge: 180 },
    { id: 2, parameter: 'Extractable Protein Content (Modified Lowry)', testMethod: 'ASTM D5712', sampleType: 'Glove', charge: 320 },
    { id: 3, parameter: 'Powder-Free Residue Test', testMethod: 'ASTM D6124', sampleType: 'Glove', charge: 150 },
    { id: 4, parameter: 'Watertightness (Freedom from Holes)', testMethod: 'ASTM D5151 / EN 455-1', sampleType: 'Glove', charge: 210 },
    { id: 5, parameter: 'Chemical Permeation Resistance', testMethod: 'ASTM F739 / EN 16523-1', sampleType: 'Glove', charge: 650 },
    { id: 6, parameter: 'Total Solids Content (TSC)', testMethod: 'ISO 124', sampleType: 'Natural Rubber Latex', charge: 95 },
    { id: 7, parameter: 'Dry Rubber Content (DRC)', testMethod: 'ISO 126', sampleType: 'Natural Rubber Latex', charge: 110 },
    { id: 8, parameter: 'Mooney Viscosity ML (1+4) 100°C', testMethod: 'ISO 289-1', sampleType: 'Standard Malaysian Rubber (SMR)', charge: 140 }
  ];

  filteredCatalog: TestCatalogItem[] = [];

  get totalChargeRM(): number {
    return this.inquiryRows.reduce((sum, item) => sum + item.charge * item.qty, 0);
  }

  get totalChargeUSD(): number {
    return this.totalChargeRM * this.usdRate;
  }

  get isWithinScope(): boolean {
    return this.inquiryRows.length > 0 && this.othersSpecify.trim().length === 0;
  }

  get isOutOfScope(): boolean {
    return this.othersSpecify.trim().length > 0;
  }

  selectService(service: string) {
    this.selectedService = service;
  }

  openLookupModal() {
    this.lookupFilter = {
      parameter: '',
      testMethod: '',
      sampleType: this.selectedSampleType
    };
    this.searchCatalog();
    this.isLookupOpen = true;
  }

  closeLookupModal() {
    this.isLookupOpen = false;
  }

  searchCatalog() {
    const p = this.lookupFilter.parameter.trim().toLowerCase();
    const m = this.lookupFilter.testMethod.trim().toLowerCase();
    const s = this.lookupFilter.sampleType;

    this.filteredCatalog = this.catalogItems
      .filter((item) => {
        const matchParam = !p || item.parameter.toLowerCase().includes(p);
        const matchMethod = !m || item.testMethod.toLowerCase().includes(m);
        const matchSample = !s || item.sampleType === s;
        return matchParam && matchMethod && matchSample;
      })
      .map((item) => ({ ...item, selected: false }));
  }

  resetLookupFilters() {
    this.lookupFilter = { parameter: '', testMethod: '', sampleType: '' };
    this.searchCatalog();
  }

  addSelectedItems() {
    const chosen = this.filteredCatalog.filter((item) => item.selected);
    for (const item of chosen) {
      const existing = this.inquiryRows.find(
        (r) => r.parameter === item.parameter && r.testMethod === item.testMethod
      );
      if (existing) {
        existing.qty += 1;
      } else {
        this.inquiryRows.push({
          parameter: item.parameter,
          testMethod: item.testMethod,
          charge: item.charge,
          qty: 1
        });
      }
    }
    this.closeLookupModal();
  }

  removeRow(index: number) {
    this.inquiryRows.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    }
  }

  sendInquiry() {
    if (!this.isOutOfScope) return;
    this.toastMessage = 'Your Inquiry successfully sent. Please expect reply within 7 working days.';
    setTimeout(() => (this.toastMessage = ''), 6000);
  }

  getQuote() {
    if (!this.isWithinScope) return;
    this.toastMessage = `Official Quotation generated for ${this.inquiryRows.length} parameter(s) — Total: RM ${this.totalChargeRM.toFixed(2)}.`;
    setTimeout(() => (this.toastMessage = ''), 6000);
  }
}