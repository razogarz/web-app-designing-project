import {Component, OnInit, signal} from '@angular/core';
import {Trip} from "../../types";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyService} from "../../services/currencyService/currency.service";
import {ActivatedRoute} from "@angular/router";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {CurrencyPipe} from "@angular/common";
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";

@Component({
  selector: 'app-single-trip-page',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './single-trip-page.component.html',
  styleUrl: './single-trip-page.component.css'
})
export class SingleTripPageComponent implements OnInit {
  trips: Trip[] = [];
  TripData: Trip = {} as Trip;
  TripId: number = 0;
  currencyRate: number = 1;
  currency: string = 'USD';
  reserveSpot: (id: number) => void = () => {};
  cancelReservation: (id: number) => void = () => {};
  constructor(
    private tripListService: TripListService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private selectedTrips: SelectedTripsService
  ){
    this.route.params.subscribe(params => {
      this.TripId = parseInt(params['id'])
    });
  }


  ngOnInit() {
    this.tripListService.tripsObservable$.subscribe((trips: Trip[]) => {
        this.trips = trips;
        this.TripData = trips.filter((trip: Trip) => trip.id == this.TripId)[0];
      }
    );
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
    this.currencyService.currencyRate$.subscribe((currencyRate: number) => {
      this.currencyRate = currencyRate;
    });
    this.reserveSpot = (id: number) => {
      this.tripListService.reserveSpot(id);
      this.selectedTrips.addTripToCheckout(this.trips.filter((trip: Trip) => trip.id == id)[0]);
    }
    this.cancelReservation = (id: number) => {
      this.tripListService.cancelReservation(id);
      this.selectedTrips.removeTripFromCheckout(this.trips.filter((trip: Trip) => trip.id == id)[0]);
    }
  }

  protected readonly tripsData = tripsData;


}
