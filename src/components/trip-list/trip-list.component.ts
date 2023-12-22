import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyService} from "../../services/currencyService/currency.service";
import {Trip} from "../../types";
import {FormsModule} from "@angular/forms";
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
    NgClass
  ],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements  OnInit {
  trips: Trip[] = [];
  currency: string = 'USD';
  currencyRate: number = 1;

  isSoldOut: (id: number) => boolean = () => false;
  shouldHidePlusButton: (id: number) => boolean = () => false;
  isGettingSoldOut: (id: number) => boolean = () => false;
  reserveSpot: (id: number) => void = () => {};
  cancelReservation: (id: number) => void = () => {};
  deleteTrip: (id: number) => void = () => {};
  rateTrip(id: number, number: number) {}

  constructor(private tripListService: TripListService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.tripListService.getTrips().subscribe((trips: Trip[]) => {
        this.trips = trips;
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
    this.isGettingSoldOut = (tripId: number) => this.tripListService.isGettingSoldOut(tripId);
    this.reserveSpot = (tripId: number) => this.tripListService.reserveSpot(tripId);
    this.cancelReservation = (tripId: number) => this.tripListService.cancelReservation(tripId);
    this.deleteTrip = (tripId: number) => this.tripListService.deleteTrip(tripId);
    this.rateTrip = (tripId: number, rating: number) => this.tripListService.rateTrip(tripId, rating);
  }



}
