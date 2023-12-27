import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutButtonComponent } from './checkout-button.component';

describe('CheckoutButtonComponent', () => {
  let component: CheckoutButtonComponent;
  let fixture: ComponentFixture<CheckoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
