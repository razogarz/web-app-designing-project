import {Component, OnInit} from '@angular/core';
import {TripListService} from "../../services/tripListService/trip-list.service";

@Component({
  selector: 'app-trip-counter',
  standalone: true,
  imports: [],
  templateUrl: './trip-counter.component.html',
  styleUrl: './trip-counter.component.css'
})
export class TripCounterComponent implements OnInit {
  reservedTripsCount: number = 0;

  constructor(private tripListService: TripListService) {
  }

  ngOnInit(): void {
    this.tripListService.getReservedTrips().subscribe((count: number) => {
        this.reservedTripsCount = count;
      }
    );
  }
}
