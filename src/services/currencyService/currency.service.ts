import { Injectable } from '@angular/core';
import {exchangeRates} from "./money";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency: string;
  currencyRate: number;
  currenciesList: string[];

  changeCurrency(currency: string) {
    this.currency = currency;
    this.currencyRate = exchangeRates.get(currency) || 1;
  }

  getData(): Observable<any> {
    return new Observable((observer) => {
      observer.next({
        currency: this.currency,
        currencyRate: this.currencyRate,
        currenciesList: this.currenciesList,
        changeCurrency: this.changeCurrency.bind(this),
      });
    });
  }

  constructor() {
    this.currency = 'USD';
    this.currencyRate = 1;
    this.currenciesList = ['USD', 'EUR', 'GBP', 'JPY', 'PLN'];
  }
}
