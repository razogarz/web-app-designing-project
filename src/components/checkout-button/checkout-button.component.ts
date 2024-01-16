import {Component, OnInit} from '@angular/core';
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";
import {checkoutItem, Trip} from "../../types";
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
  checkoutTrips: Trip[] = [];
  currency: string = 'USD';
  checkoutItems: checkoutItem[] = [];

  removeTripFromCheckout(trip: Trip) {}
  constructor(private selectedTrips: SelectedTripsService, private tripList: TripListService, private currencyService: CurrencyService) {}
  ngOnInit(): void {
    this.selectedTrips.checkoutTrips$.subscribe((trips) => {
      this.checkoutTrips = trips;
      this.checkoutItems = [];
      this.checkoutItems = [...new Set(this.checkoutTrips)].map((trip) => {
        return {
          trip,
          quantity: trips.filter((t) => t.id === trip.id).length,
        };
      });
    });
    this.removeTripFromCheckout = (trip) => {
      this.selectedTrips.removeTripFromCheckout(trip);
      this.tripList.cancelReservation(trip.id);
    }
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
  }
}
