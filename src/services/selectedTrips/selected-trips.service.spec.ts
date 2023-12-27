import { TestBed } from '@angular/core/testing';

import { SelectedTripsService } from './selected-trips.service';

describe('SelectedTripsService', () => {
  let service: SelectedTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
