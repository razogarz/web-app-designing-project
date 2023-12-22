import { Component } from '@angular/core';
import {TripCounterComponent} from "../../components/trip-counter/trip-counter.component";
import {CurrencyDropdownComponent} from "../../components/currency-dropdown/currency-dropdown.component";
import {TripListComponent} from "../../components/trip-list/trip-list.component";
import {AddTripFormComponent} from "../../components/add-trip-form/add-trip-form.component";
import {ReservedTripsCostComponent} from "../../components/reserved-trips-cost/reserved-trips-cost.component";

@Component({
  selector: 'app-trips-list-page',
  standalone: true,
  imports: [
    TripCounterComponent,
    CurrencyDropdownComponent,
    TripListComponent,
    AddTripFormComponent,
    ReservedTripsCostComponent
  ],
  templateUrl: './trips-list-page.component.html',
  styleUrl: './trips-list-page.component.css'
})
export class TripsListPageComponent {

}
