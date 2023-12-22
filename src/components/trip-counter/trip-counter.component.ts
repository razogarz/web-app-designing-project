import {Component, OnInit} from '@angular/core';
import {TripListService} from "../../services/tripListService/trip-list.service";
import {CurrencyDropdownComponent} from "../currency-dropdown/currency-dropdown.component";
import {ReservedTripsCostComponent} from "../reserved-trips-cost/reserved-trips-cost.component";

@Component({
  selector: 'app-trip-counter',
  standalone: true,
  imports: [
    CurrencyDropdownComponent,
    ReservedTripsCostComponent
  ],
  templateUrl: './trip-counter.component.html',
  styleUrl: './trip-counter.component.css'
})
export class TripCounterComponent implements OnInit {
  reservedTripsCount: number = 0;

  constructor(private tripListService: TripListService) {}

  ngOnInit(): void {
    this.tripListService.reservedTripsCount$.subscribe((count: number) => {
      this.reservedTripsCount = count;
    }
    );
  }
}
