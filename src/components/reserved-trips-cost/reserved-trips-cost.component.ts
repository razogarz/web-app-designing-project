import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currencyService/currency.service";
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-reserved-trips-cost',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './reserved-trips-cost.component.html',
  styleUrl: './reserved-trips-cost.component.css'
})
export class ReservedTripsCostComponent implements OnInit {
  currency = 'USD';
  exchangeRate = 1;
  reservedTripsCost = 0;

  countTripsCost() {}
  constructor(private currencyService: CurrencyService, private tripListService: TripListService) {}

  ngOnInit(): void {
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
    this.currencyService.currencyRate$.subscribe((rate: number) => {
      this.exchangeRate = rate;
    });
    this.tripListService.reservedTripsCount$.subscribe((count: number) => {
      this.reservedTripsCost = this.tripListService.getReservedTripsCost();
    });

  }
}
