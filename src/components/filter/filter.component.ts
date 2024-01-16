import {Component, OnInit} from '@angular/core';
import {Filter, Trip} from "../../types";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  options: string[] = ['price', 'rating'];
  trips: Trip[] = [];
  countries: string[] = [];
  filter: Filter = {
    name: '',
    country: [],
    startDate: '',
    endDate: '',
    priceFrom: 0,
    priceTo: 0,
    rating: []
  };

  filterTrips() {};

  constructor(private tripListService: TripListService) {}

  ngOnInit(): void {
    this.tripListService.getOriginalTrips().subscribe((trips: Trip[]) => {
        this.trips = trips;
      }
    );
    this.tripListService.getOriginalTrips().subscribe((trips: Trip[]) => {
        this.countries = [...new Set(trips.map((trip: Trip) => trip.country))];
      }
    );
    this.filterTrips = () => this.tripListService.filterTrips(this.filter);

  }

  addCountry(country: string) {
    if (!this.filter.country.includes(country)) {
      this.filter.country.push(country);
    }
    this.filterTrips();
  }

  removeCountry(country: string) {
    this.filter.country = this.filter.country.filter((c: string) => c !== country);
    this.filterTrips();
  }

  addRating(rating: number) {
    if (!this.filter.rating.includes(rating)) {
      this.filter.rating.push(rating);
    }
    this.filterTrips();
  }

  removeRating(rating: number) {
    this.filter.rating = this.filter.rating.filter((r: number) => r !== rating);
    this.filterTrips();
  }
}
