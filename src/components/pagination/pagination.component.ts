import {Component, OnInit} from '@angular/core';
import {TripListService} from "../../services/tripListService/trip-list.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 1
  pages: number[] = [];
  changePage: (page: number) => void = () => {};
  constructor(
    private tripListService: TripListService,
  ) {}

  ngOnInit(): void {
    this.tripListService.currentPaginationPage$.subscribe((page: number) => {
      this.currentPage = page;
    });
    this.tripListService.tripsObservable$.subscribe((trips) => {
      this.totalPages = Math.ceil(trips.length / 3);
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
      console.log({
        tripsLength: trips.length,
        totalPages: this.totalPages,
        currentPage: this.currentPage
      })
    });
    this.changePage = (page: number) => this.tripListService.changePaginationPage(page)
  }

}
