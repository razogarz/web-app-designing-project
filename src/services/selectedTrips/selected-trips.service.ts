import { Injectable } from '@angular/core';
import {Trip} from "../../types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedTripsService {
  checkoutTrips = new BehaviorSubject([] as Trip[]);
  checkoutTrips$ = this.checkoutTrips.asObservable();
  historyTrips = new BehaviorSubject([] as Trip[]);
  historyTrips$ = this.historyTrips.asObservable();

  addTripToCheckout(trip: Trip) {
    const trips = this.checkoutTrips.getValue();
    trips.push(trip);
    this.checkoutTrips.next(trips);
  }

  removeTripFromCheckout(trip: Trip) {
    const trips = this.checkoutTrips.getValue();
    const index = trips.findIndex((t) => t.id === trip.id);
    trips.splice(index, 1);
    this.checkoutTrips.next(trips);
  }

  addTripsToHistory(trips: Trip[]) {
    const historyTrips = this.historyTrips.getValue();
    historyTrips.push(...trips);
    this.historyTrips.next(historyTrips);
    this.checkoutTrips = new BehaviorSubject([] as Trip[]);
    this.checkoutTrips$ = this.checkoutTrips.asObservable();
    console.log({
      historyTrips: this.historyTrips.getValue(),
      checkoutTrips: this.checkoutTrips.getValue()
    })
  }

  removeTripFromHistory(trip: Trip) {
    const trips = this.historyTrips.getValue();
    const index = trips.findIndex((t) => t.id === trip.id);
    trips.splice(index, 1);
    this.historyTrips.next(trips);
  }

  constructor() { }
}
