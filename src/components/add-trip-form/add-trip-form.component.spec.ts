import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripFormComponent } from './add-trip-form.component';

describe('AddTripFormComponent', () => {
  let component: AddTripFormComponent;
  let fixture: ComponentFixture<AddTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTripFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
