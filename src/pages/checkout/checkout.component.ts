import {Component, OnInit} from '@angular/core';
import {Trip} from "../../types";
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutTrips: Trip[] = [];
  total: number = 0;

  removeTripFromCheckout(trip: Trip) {
    this.checkoutTripsService.removeTripFromCheckout(trip);
    this.tripList.cancelReservation(trip.id);
  }

  addTripsToHistory() {
    this.checkoutTripsService.addTripsToHistory(this.checkoutTrips);
    this.checkoutTrips = [];
  }
  constructor(private checkoutTripsService: SelectedTripsService, private tripList: TripListService) {}
  ngOnInit(): void {
    this.checkoutTripsService.checkoutTrips$.subscribe((trips) => {
        this.checkoutTrips = trips;
        this.total = trips.reduce((total, trip) => total + trip.unitPrice, 0);
      }
    );
  }
}
