import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsListPageComponent } from './trips-list-page.component';

describe('TripsListPageComponent', () => {
  let component: TripsListPageComponent;
  let fixture: ComponentFixture<TripsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
