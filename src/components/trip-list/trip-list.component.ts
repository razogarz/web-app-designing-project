import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
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
    FormsModule
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

  constructor(private tripListService: TripListService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.tripListService.getTrips().subscribe((trips: Trip[]) => {
        this.trips = trips;
      }
    );
    this.currencyService.getData().subscribe((data: any) => {
        this.currency = data.currency;
        this.currencyRate = data.currencyRate;
      }
    );
    this.isSoldOut = this.tripListService.isSoldOut;
    this.shouldHidePlusButton = this.tripListService.shouldHidePlusButton;
    this.isGettingSoldOut = this.tripListService.isGettingSoldOut;
    this.reserveSpot = this.tripListService.reserveSpot;
    this.cancelReservation = this.tripListService.cancelReservation;
    this.deleteTrip = this.tripListService.deleteTrip;
  }


}
