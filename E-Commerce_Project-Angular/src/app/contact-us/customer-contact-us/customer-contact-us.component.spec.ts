import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactUsComponent } from './customer-contact-us.component';

describe('CustomerContactUsComponent', () => {
  let component: CustomerContactUsComponent;
  let fixture: ComponentFixture<CustomerContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
