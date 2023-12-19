import { Injectable } from '@angular/core';
import {Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";
import {exchangeRates} from "../../components/trip-list/tripsDummyData/money";

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  trips: Trip[] = tripsData;
  selectedCurrency: string = 'USD';
  currencyRate: number = exchangeRates.get(this.selectedCurrency) || 1;

  constructor() {
    this.selectedCurrency = 'USD';
    this.currencyRate = exchangeRates.get(this.selectedCurrency) || 1;
  }
}
