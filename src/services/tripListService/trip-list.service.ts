import { Injectable } from '@angular/core';
import {Filter, Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  trips: Trip[];
  tripsOriginal: Trip[];
  tripsMap: Map<number, number>;
  private reservedTripsCount = new BehaviorSubject<number>(0);
  reservedTripsCount$ = this.reservedTripsCount.asObservable();
  private tripsObservable = new BehaviorSubject<Trip[]>([]);
  tripsObservable$ = this.tripsObservable.asObservable();

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
    if (idMapped === undefined || idMapped >= this.trips.length) return false;
    return this.trips[idMapped].maxCapacity === this.trips[idMapped]?.reservedCapacity;
  }

  shouldHidePlusButton(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if (idMapped === undefined || idMapped >= this.trips.length) return false;
    return this.isSoldOut(tripId);
  }

  isGettingSoldOut(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if (idMapped === undefined || idMapped >= this.trips.length) return false;
    return this.trips[idMapped].maxCapacity - this.trips[idMapped]?.reservedCapacity <= 3;
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

  getOriginalTrips(): Observable<Trip[]> {
    return of(this.tripsOriginal);
  }

  updateReservedTripsCount() {
    this.reservedTripsCount.next(this.trips.reduce((acc, trip) => acc + trip.reservedCapacity, 0));
  }

  filterTrips(filter: Filter){
    this.trips = this.tripsOriginal.filter((trip) => {
      let name = trip.name.toLowerCase().includes(filter.name.toLowerCase());
      let country = filter.country.length === 0 || filter.country.includes(trip.country);
      let startDate = filter.startDate === '' || filter.startDate <= trip.startDate;
      let endDate = filter.endDate === '' || filter.endDate >= trip.endDate;
      let priceFrom = filter.priceFrom === 0 || filter.priceFrom <= trip.unitPrice;
      let priceTo = filter.priceTo === 0 || filter.priceTo >= trip.unitPrice;
      let rating = filter.rating.length === 0 || filter.rating.includes(Math.floor(trip.rating));
      return name && country && startDate && endDate && priceFrom && priceTo && rating;
    });
    this.updateTripsMap();
    this.tripsObservable.next(this.trips);
    console.log({
      trips: this.trips,
      filter: filter
    });
  }

  constructor() {
    this.trips = tripsData;
    this.tripsOriginal = tripsData;
    this.tripsMap = new Map<number, number>();
    this.tripsObservable.next(this.trips);
    this.updateTripsMap();
  }

  isMostExpensive(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if (idMapped === undefined || idMapped >= this.trips.length) return false;
    return this.trips[idMapped].unitPrice === this.trips.reduce((max, trip) => trip.unitPrice > max ? trip.unitPrice : max, 0);
  }

  isCheapest(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if (idMapped === undefined || idMapped >= this.trips.length) return false;
    return this.trips[idMapped].unitPrice === this.trips.reduce((min, trip) => trip.unitPrice < min ? trip.unitPrice : min, 0);
  }
}
