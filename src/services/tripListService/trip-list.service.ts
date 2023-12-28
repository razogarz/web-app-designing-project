import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  setDoc, where,
} from "@angular/fire/firestore";
import {Filter, Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {runTransaction} from "@angular/fire/database";

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  firestore: Firestore = inject(Firestore);
  tripsCollection;
  tripsCollectionData: Observable<any>;

  trips: Trip[];
  tripsOriginal: Trip[];

  currentPaginationPage = new BehaviorSubject(1);
  currentPaginationPage$ = this.currentPaginationPage.asObservable();

  private reservedTripsCount = new BehaviorSubject<number>(0);
  reservedTripsCount$ = this.reservedTripsCount.asObservable();
  private tripsObservable = new BehaviorSubject<Trip[]>([]);
  tripsObservable$ = this.tripsObservable.asObservable();

  constructor() {
    this.tripsCollection = collection(this.firestore, 'Trips');
    this.trips = tripsData;
    this.tripsOriginal = tripsData;
    this.updateReservedTripsCount();
    this.tripsObservable.next(this.trips);
    try {
      this.tripsCollectionData = collectionData(this.tripsCollection);
      this.tripsCollectionData.subscribe((trips) => {
        this.trips = trips;
        this.tripsOriginal = trips;
        this.updateReservedTripsCount();
        this.tripsObservable.next(this.trips);
      });
    }
    catch (e) {
      this.tripsCollectionData = of([]);
      console.log(e);
    }
  }

  getTrips(): Observable<any[]> {
    const q = query(
      this.tripsCollection,
      orderBy("startDate"),
    );
    return collectionData(q, {idField: 'id'});
  }

  addTrip(trip: Trip): Observable<boolean> {
    const response = new Observable<boolean>(observer => {
      setDoc(doc(this.tripsCollection), trip).then(() => {
        observer.next(true);
        observer.complete();
      }).catch(error => {
        console.error('Error adding trip: ', error);
        observer.next(false);
        observer.complete();
      });
    });
    response.subscribe((success) => {
      console.log(success);
    });
    return response;
  }
  async deleteTrip(tripId: number) {
    const q = query(this.tripsCollection, where('id', '==', tripId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          const tripDocRef = doc(this.tripsCollection, docSnapshot.id);
          deleteDoc(tripDocRef).then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        });
      } else {
        console.log("No matching documents found");
      }
    } catch (error) {
      console.error("Error querying documents: ", error);
    }
  }

  changePaginationPage(page: number) {
    this.currentPaginationPage.next(page);
  }

  reserveSpot(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      trip.yourReservations++;
      this.updateReservedTripsCount();
    }
  }

  cancelReservation(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      trip.yourReservations--;
      this.updateReservedTripsCount();
    }
  }
  isSoldOut(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      return trip.reservedCapacity + trip.yourReservations >= trip.maxCapacity;
    }
    return false;
  }

  shouldHidePlusButton(tripId: number) {
    return this.isSoldOut(tripId);
  }

  shouldHideMinusButton(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);

    return trip ? trip.yourReservations <= 0 : true;
  }

  isGettingSoldOut(tripId: number) {
    const sellOutThreshold = 3;
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      return trip.reservedCapacity + trip.yourReservations + sellOutThreshold >= trip.maxCapacity;
    }
    return false;
  }

  rateTrip(id: number, rating: number) {
    const trip = this.trips.find((trip) => trip.id === id);
    if (trip) {
      trip.rating = (trip.rating + rating) / 2;
    }
  }

  getReservedTripsCost() {
    let cost = 0;
    this.trips.forEach((trip) => {
      cost += trip.yourReservations * trip.unitPrice;
    });
    return cost;
  }

  getOriginalTrips(): Observable<Trip[]> {
    return of(this.tripsOriginal);
  }

  updateReservedTripsCount() {
    this.reservedTripsCount.next(this.trips.reduce((acc, trip) => acc + trip.yourReservations, 0));
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
    this.tripsObservable.next(this.trips);
    console.log({
      trips: this.trips,
      filter: filter
    });
  }
  isMostExpensive(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      return trip.unitPrice === Math.max(...this.trips.map((trip) => trip.unitPrice));
    }
    return false;
  }

  isCheapest(tripId: number) {
    const trip = this.trips.find((trip) => trip.id === tripId);
    if (trip) {
      return trip.unitPrice === Math.min(...this.trips.map((trip) => trip.unitPrice));
    }
    return false;
  }


}
