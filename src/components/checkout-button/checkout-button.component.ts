import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";
import {Trip} from "../../types";
import {NgForOf, NgIf} from "@angular/common";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyService} from "../../services/currencyService/currency.service";
@Component({
  selector: 'app-checkout-button',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './checkout-button.component.html',
  styleUrl: './checkout-button.component.css'
})
export class CheckoutButtonComponent implements OnInit {
  trips: Trip[] = [];
  currency: string = 'USD';
  checkoutTrips: Trip[] = [];

  removeTripFromCheckout(trip: Trip) {}
  addTripsToHistory(trips: Trip[]) {}
  constructor(private selectedTrips: SelectedTripsService, private tripList: TripListService, private currencyService: CurrencyService) {}
  ngOnInit(): void {

    this.selectedTrips.checkoutTrips$.subscribe((trips) => {
      this.checkoutTrips = trips;
    });
    this.removeTripFromCheckout = (trip) => {
      this.selectedTrips.removeTripFromCheckout(trip);
      this.tripList.cancelReservation(trip.id);
    }
    this.addTripsToHistory = (trips) => {
      this.selectedTrips.addTripsToHistory(trips);
    }
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
  }
}
