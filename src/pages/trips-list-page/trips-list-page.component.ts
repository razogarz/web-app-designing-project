import { Component } from '@angular/core';
import {TripCounterComponent} from "../../components/trip-counter/trip-counter.component";
import {CurrencyDropdownComponent} from "../../components/currency-dropdown/currency-dropdown.component";
import {TripListComponent} from "../../components/trip-list/trip-list.component";

@Component({
  selector: 'app-trips-list-page',
  standalone: true,
  imports: [
    TripCounterComponent,
    CurrencyDropdownComponent,
    TripListComponent
  ],
  templateUrl: './trips-list-page.component.html',
  styleUrl: './trips-list-page.component.css'
})
export class TripsListPageComponent {

}
