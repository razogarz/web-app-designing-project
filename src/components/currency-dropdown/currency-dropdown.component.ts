import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { CurrencyService } from '../../services/currencyService/currency.service';

@Component({
  selector: 'app-currency-dropdown',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf
    ],
  templateUrl: './currency-dropdown.component.html',
  styleUrl: './currency-dropdown.component.css'
})
export class CurrencyDropdownComponent implements OnInit {
  currency: string;
  currencyRate: number;
  currenciesList: string[];

  changeCurrency(currency: string){}

  constructor(private currencyService: CurrencyService) {
    this.currency = 'USD';
    this.currencyRate = 1;
    this.currenciesList = [];
  }

  ngOnInit() {
    this.currencyService.currency$.subscribe((currency: string) => {
      this.currency = currency;
    });
    this.currencyService.currencyRate$.subscribe((currencyRate: number) => {
      this.currencyRate = currencyRate;
    });
    this.currencyService.getData().subscribe((data: any) => {
      this.currenciesList = data.currenciesList;
    });
    this.changeCurrency = (currency: string) => this.currencyService.changeCurrency(currency);
  }
}
