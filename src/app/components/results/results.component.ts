import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  hotels: any[] = [];
  displayedHotels: any[] = [];

  loading = true;
  pageSize = 10;
  pageIndex = 0;
  totalResults = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    const stateData = history.state?.data;

    if (stateData) {
      this.fetchHotels(stateData);
    } else {
      this.loading = false;
    }
  }

  fetchHotels(data: any) {
    this.hotelService.getHotels(data).subscribe({
      next: (res: any) => {
        this.hotels = res.message?.hotels || [];
        this.totalResults = this.hotels.length;
        this.updateDisplayedHotels();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
        this.loading = false;
      },
    });
  }

  updateDisplayedHotels() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedHotels = this.hotels.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedHotels();
  }
}
