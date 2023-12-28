import {Component, OnInit} from '@angular/core';
import {TripListService} from "../../services/tripListService/trip-list.service";
import {Trip} from "../../types";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {exchangeRates} from "../../services/currencyService/money";
import {CurrencyService} from "../../services/currencyService/currency.service";

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css'
})
export class AddTripFormComponent implements OnInit{
  tripForm: FormGroup = new FormGroup({});
  highestId: number = 0;
  exchangeRate = 1;

  constructor(private fb: FormBuilder, private tripListService: TripListService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.initiateForm();
    this.tripListService.getOriginalTrips().subscribe((trips: Trip[]) => {
        this.highestId = trips.reduce((max, trip) => trip.id > max ? trip.id : max, 0);
      });
    this.currencyService.currencyRate$.subscribe((rate: number) => {
      this.exchangeRate = rate;
    });
  }

  private initiateForm(): void {
    this.tripForm = this.fb.group({
      name: '',
      country: '',
      startDate: '',
      endDate: '',
      unitPrice: 0,
      maxCapacity: 0,
      reservedCapacity: 0,
      yourReservations: 0,
      description: '',
      photoLink: '/assets/tripsDummyPhotos/warsaw.jpg'
    });
  }

  addTrip(): void {
    if (this.tripForm.valid) {
      const newTrip: Trip = this.tripForm.value as Trip;
      newTrip.id = this.highestId + 1;
      newTrip.unitPrice = newTrip.unitPrice / this.exchangeRate;
      this.highestId = newTrip.id;
      this.tripListService.addTrip(newTrip);
      this.tripForm.reset();
    } else {
      alert('Please fill out all the fields.');
    }
  }
}
