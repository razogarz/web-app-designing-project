import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {Trip} from "../../types";
import {FormsModule} from "@angular/forms";
import {exchangeRates} from "./tripsDummyData/money";
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
export class TripListComponent {
  trips: Trip[] = [];
  currency: string = "";
  currencyRate: number = 1;
  currenciesList: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'PLN'];

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

  getReservedTripsCount() {
    let count = 0;
    for (let i = 0; i < this.trips.length; i++) {
      count += this.trips[i].reservedCapacity;
    }
    return count;
  }

  isGettingSoldOut(tripId: number) {
    let idMapped = this.tripsMap.get(tripId);
    if(idMapped === undefined) return false;
    return this.trips[idMapped].maxCapacity - this.trips[idMapped].reservedCapacity <= 3;
  }

  changeCurrency(currency: string) {
    this.currency = currency;
    this.currencyRate = exchangeRates.get(currency) || 1;
  }

  constructor(private tripListService: TripListService) {
    this.trips = tripListService.trips;
    this.currency = tripListService.selectedCurrency;
    this.currencyRate = tripListService.currencyRate;
    for (let i = 0; i < this.trips.length; i++) {
      this.tripsMap.set(this.trips[i].id, i);
    }
  }

  protected readonly exchangeRates = exchangeRates;
  protected readonly customElements = customElements;
}
