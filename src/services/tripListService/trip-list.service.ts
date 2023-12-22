import { Injectable } from '@angular/core';
import {Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  trips: Trip[];
  tripsSearch: Trip[];
  tripsMap: Map<number, number>;
  private reservedTripsCount = new BehaviorSubject<number>(0);
  reservedTripsCount$ = this.reservedTripsCount.asObservable();

  reserveSpot(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return;
    let max = this.trips[idMapped].maxCapacity;
    let reserved = this.trips[idMapped].reservedCapacity;
    if (max - reserved > 0){
      this.trips[idMapped].reservedCapacity++;
    }
    this.updateReservedTripsCount();
  }

  cancelReservation(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return;
    let reserved = this.trips[idMapped].reservedCapacity;
    if (reserved > 0){
      this.trips[idMapped].reservedCapacity--;
    }
    this.updateReservedTripsCount();
  }

  isSoldOut(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return false;
    return this.trips[idMapped].maxCapacity === this.trips[idMapped].reservedCapacity;
  }

  shouldHidePlusButton(tripId: number) {
    return this.isSoldOut(tripId);
  }

  isGettingSoldOut(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return false;
    return this.trips[idMapped].maxCapacity - this.trips[idMapped].reservedCapacity <= 3;
  }

  updateTripsMap() {
    for (let i = 0; i < this.trips.length; i++) {
      this.tripsMap.set(this.trips[i].id, i);
    }
  }

  deleteTrip(id: number) {
    const index = this.tripsMap.get(id);
    if (index !== undefined) {
      this.trips.splice(index, 1);
      this.tripsMap = new Map<number, number>();
      this.updateTripsMap();
    }
    this.updateReservedTripsCount();
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsMap = new Map<number, number>();
    this.updateTripsMap();
    this.updateReservedTripsCount();
  }

  rateTrip(id: number, rating: number) {
    console.log(id, rating);
    const index = this.tripsMap.get(id);
    if (index !== undefined) {
      this.trips[index].rating = rating;
    }
  }

  getReservedTripsCost() {
    let cost = 0;
    this.trips.forEach((trip) => {
      console.log({
        reservedCapacity: trip.reservedCapacity,
        unitPrice: trip.unitPrice,
      })
      cost += trip.reservedCapacity * trip.unitPrice;
    });
    return cost;
  }

  getTrips(): Observable<Trip[]> {
    return of(this.trips);
  }

  updateReservedTripsCount() {
    this.reservedTripsCount.next(this.trips.reduce((acc, trip) => acc + trip.reservedCapacity, 0));
  }

  constructor() {
    this.trips = tripsData;
    this.tripsSearch = tripsData;
    this.tripsMap = new Map<number, number>();
    this.updateTripsMap();
  }
}
