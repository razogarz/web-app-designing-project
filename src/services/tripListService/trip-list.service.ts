import { Injectable } from '@angular/core';
import {Trip} from "../../types";
import {tripsData} from "../../components/trip-list/tripsDummyData/trips";

@Injectable({
  providedIn: 'root'
})
export class TripListService {
  trips: Trip[] = tripsData;

  constructor() {

  }
}
