import { Injectable } from '@angular/core';
import {exchangeRates} from "./money";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency = new BehaviorSubject('USD');
  private currencyRate = new BehaviorSubject(1);
  currenciesList: string[];
  currency$ = this.currency.asObservable();
  currencyRate$ = this.currencyRate.asObservable();

  changeCurrency(currency: string) {
    this.currency.next(currency);
    this.currencyRate.next(exchangeRates.get(currency) || 1);
  }

  getData(): Observable<any> {
    return new Observable((observer) => {
      observer.next({
        currenciesList: this.currenciesList,
      });
    });
  }

  constructor() {
    this.currenciesList = ['USD', 'EUR', 'GBP', 'JPY', 'PLN'];
  }
}
