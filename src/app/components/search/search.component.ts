import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkin_date: ['', Validators.required],
      checkout_date: ['', Validators.required],
      rooms: [1, [Validators.required, Validators.min(1)]],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSearch() {
    const formData = this.searchForm.value;
    const formattedData = {
      ...formData,
      checkin_date: this.formatDate(formData.checkin_date),
      checkout_date: this.formatDate(formData.checkout_date)
    };
    this.router.navigate(['/results'], { state: { data: formattedData } });
  }
}
