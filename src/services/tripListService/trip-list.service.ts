import { Injectable } from '@angular/core';
import {Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  trips: Trip[];
  tripsSearch: Trip[];

  getReservedTrips(): Observable<number> {
    return of(this.trips.reduce((acc, trip) => acc + trip.reservedCapacity, 0));
  }

  tripsMap: Map<number, number> = new Map<number, number>();
  reserveSpot(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return;
    let max = this.trips[idMapped].maxCapacity;
    let reserved = this.trips[idMapped].reservedCapacity;
    if (max - reserved > 0){
      this.trips[idMapped].reservedCapacity++;
    }
  }

  cancelReservation(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return;
    let reserved = this.trips[idMapped].reservedCapacity;
    if (reserved > 0){
      this.trips[tripId].reservedCapacity--;
    }
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
  }

  getTrips(): Observable<Trip[]> {
    return of(this.trips);
  }

  constructor() {
    this.trips = tripsData;
    this.tripsSearch = tripsData;
  }
}
