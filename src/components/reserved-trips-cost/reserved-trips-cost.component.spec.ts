import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedTripsCostComponent } from './reserved-trips-cost.component';

describe('ReservedTripsCostComponent', () => {
  let component: ReservedTripsCostComponent;
  let fixture: ComponentFixture<ReservedTripsCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedTripsCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservedTripsCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
