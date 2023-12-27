import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Trip} from "../../types";
import {SelectedTripsService} from "../../services/selectedTrips/selected-trips.service";
import {CurrencyService} from "../../services/currencyService/currency.service";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  historyTrips: Trip[] = [];
  currency: string = 'USD';

  constructor(private currencyService: CurrencyService, private selectedTrips: SelectedTripsService) {}
  ngOnInit(): void {
    this.selectedTrips.historyTrips$.subscribe((trips) => {
      this.historyTrips = trips;
    });
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
  }

}
