import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCounterComponent } from './trip-counter.component';

describe('TripCounterComponent', () => {
  let component: TripCounterComponent;
  let fixture: ComponentFixture<TripCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
