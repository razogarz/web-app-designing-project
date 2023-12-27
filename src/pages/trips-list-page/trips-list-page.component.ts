import { Component } from '@angular/core';
import {TripCounterComponent} from "../../components/trip-counter/trip-counter.component";
import {CurrencyDropdownComponent} from "../../components/currency-dropdown/currency-dropdown.component";
import {TripListComponent} from "../../components/trip-list/trip-list.component";
import {AddTripFormComponent} from "../../components/add-trip-form/add-trip-form.component";
import {ReservedTripsCostComponent} from "../../components/reserved-trips-cost/reserved-trips-cost.component";
import {FilterComponent} from "../../components/filter/filter.component";
import {CheckoutButtonComponent} from "../../components/checkout-button/checkout-button.component";

@Component({
  selector: 'app-trips-list-page',
  standalone: true,
  imports: [
    TripCounterComponent,
    CurrencyDropdownComponent,
    TripListComponent,
    AddTripFormComponent,
    ReservedTripsCostComponent,
    FilterComponent,
    CheckoutButtonComponent
  ],
  templateUrl: './trips-list-page.component.html',
  styleUrl: './trips-list-page.component.css'
})
export class TripsListPageComponent {

}
