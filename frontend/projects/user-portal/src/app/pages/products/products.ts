import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, DecimalPipe, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  searchQuery = '';
  selectedCategory = 'All';
  selectedSample = 'All';

  categories = [
    'All',
    'Testing & Calib.',
    'Product Cert',
    'Proficiency Testing',
    'Reference Material',
    'Lab Inspectorate',
    'Consultancy'
  ];

  sampleTypes = [
    'All',
    'Glove',
    'Natural Rubber Latex',
    'Standard Malaysian Rubber (SMR)',
    'Rubber Compound',
    'Tyre & Automotive'
  ];

  catalog = [
    { category: 'Testing & Calib.', parameter: 'Tensile Strength & Elongation at Break', method: 'ASTM D412 / ISO 37', sample: 'Glove', priceRM: 180, priceUSD: 40 },
    { category: 'Testing & Calib.', parameter: 'Extractable Protein Content (Modified Lowry)', method: 'ASTM D5712', sample: 'Glove', priceRM: 320, priceUSD: 71 },
    { category: 'Testing & Calib.', parameter: 'Powder-Free Residue Test', method: 'ASTM D6124', sample: 'Glove', priceRM: 150, priceUSD: 33 },
    { category: 'Testing & Calib.', parameter: 'Watertightness (Freedom from Holes)', method: 'ASTM D5151 / EN 455-1', sample: 'Glove', priceRM: 210, priceUSD: 47 },
    { category: 'Testing & Calib.', parameter: 'Chemical Permeation Resistance', method: 'ASTM F739 / EN 16523-1', sample: 'Glove', priceRM: 650, priceUSD: 145 },
    { category: 'Testing & Calib.', parameter: 'Total Solids Content (TSC)', method: 'ISO 124', sample: 'Natural Rubber Latex', priceRM: 95, priceUSD: 21 },
    { category: 'Testing & Calib.', parameter: 'Dry Rubber Content (DRC)', method: 'ISO 126', sample: 'Natural Rubber Latex', priceRM: 110, priceUSD: 25 },
    { category: 'Testing & Calib.', parameter: 'Mooney Viscosity ML (1+4) 100°C', method: 'ISO 289-1', sample: 'Standard Malaysian Rubber (SMR)', priceRM: 140, priceUSD: 31 },
    { category: 'Product Cert', parameter: 'SMG (Standard Malaysian Glove) Certification Audit', method: 'MRB-SMG-01', sample: 'Glove', priceRM: 2500, priceUSD: 555 },
    { category: 'Proficiency Testing', parameter: 'Inter-Laboratory Glove Tensile & Protein PT Scheme', method: 'ISO/IEC 17043', sample: 'Glove', priceRM: 850, priceUSD: 190 },
    { category: 'Reference Material', parameter: 'Certified Standard Natural Rubber Reference Sheet', method: 'ISO 17034', sample: 'Standard Malaysian Rubber (SMR)', priceRM: 420, priceUSD: 94 }
  ];

  get filteredCatalog() {
    const q = this.searchQuery.trim().toLowerCase();
    return this.catalog.filter((item) => {
      const matchCat = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchSample = this.selectedSample === 'All' || item.sample === this.selectedSample;
      const matchQuery =
        !q ||
        item.parameter.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q) ||
        item.sample.toLowerCase().includes(q);
      return matchCat && matchSample && matchQuery;
    });
  }
}