import { Routes } from '@angular/router';
import {TripsListPageComponent} from "../pages/trips-list-page/trips-list-page.component";
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {AddTripFormComponent} from "../components/add-trip-form/add-trip-form.component";
import {CheckoutComponent} from "../pages/checkout/checkout.component";
import {HistoryComponent} from "../pages/history/history.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'tripsList', component: TripsListPageComponent},
  { path: 'tripForm', component: AddTripFormComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'history', component: HistoryComponent},

];
