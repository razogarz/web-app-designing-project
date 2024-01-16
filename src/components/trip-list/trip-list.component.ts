import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, UpperCasePipe} from "@angular/common";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyService} from "../../services/currencyService/currency.service";
import {Trip} from "../../types";
import {FormsModule} from "@angular/forms";
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    NgForOf,
    UpperCasePipe,
    CurrencyPipe,
    NgIf,
    NgStyle,
    FormsModule,
    NgClass,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  currency: string = 'USD';
  currencyRate: number = 1;
  checkoutTrips: Trip[] = [];
  paginationPage = 1;

  isSoldOut: (id: number) => boolean = () => false;
  shouldHidePlusButton: (id: number) => boolean = () => false;
  shouldHideMinusButton: (id: number) => boolean = () => false;
  isGettingSoldOut: (id: number) => boolean = () => false;
  reserveSpot: (id: number) => void = () => {};
  cancelReservation: (id: number) => void = () => {};
  deleteTrip: (id: number) => void = () => {};
  rateTrip(id: number, number: number) {}
  isMostExpensive(id: number) {return false;}

  isCheapest(id: number) {return false;}

  constructor(private tripListService: TripListService, private currencyService: CurrencyService, private selectedTrips: SelectedTripsService) {}

  getTripsPage() {
    return this.trips.slice((this.paginationPage - 1) * 3, this.paginationPage * 3);
  }
  ngOnInit(): void {
    this.tripListService.tripsObservable$.subscribe((trips: Trip[]) => {
        this.trips = trips;
        console.log(this.trips);
      }
    );
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
    this.currencyService.currencyRate$.subscribe((currencyRate: number) => {
      this.currencyRate = currencyRate;
    });
    this.isSoldOut = (tripId: number) => this.tripListService.isSoldOut(tripId);
    this.shouldHidePlusButton = (tripId: number) => this.tripListService.shouldHidePlusButton(tripId);
    this.shouldHideMinusButton = (tripId: number) => this.tripListService.shouldHideMinusButton(tripId);
    this.isGettingSoldOut = (tripId: number) => this.tripListService.isGettingSoldOut(tripId);
    this.reserveSpot = (tripId: number) => {
      this.tripListService.reserveSpot(tripId);
      this.selectedTrips.addTripToCheckout(this.trips.find((trip) => trip.id === tripId) as Trip);
    }
    this.cancelReservation = (tripId: number) => {
      this.tripListService.cancelReservation(tripId);
      this.selectedTrips.removeTripFromCheckout(this.trips.find((trip) => trip.id === tripId) as Trip);
    }
    this.deleteTrip = (tripId: number) => {
      this.tripListService.deleteTrip(tripId);
      this.selectedTrips.removeTripFromHistory(this.trips.find((trip) => trip.id === tripId) as Trip);
    }
    this.rateTrip = (tripId: number, rating: number) => this.tripListService.rateTrip(tripId, rating);
    this.isMostExpensive = (tripId: number) => this.tripListService.isMostExpensive(tripId);
    this.isCheapest = (tripId: number) => this.tripListService.isCheapest(tripId);

    this.selectedTrips.checkoutTrips$.subscribe((trips: Trip[]) => {
      this.checkoutTrips = trips;
    });

    this.tripListService.currentPaginationPage$.subscribe((page: number) => {
      this.paginationPage = page;
    });
  }
}
