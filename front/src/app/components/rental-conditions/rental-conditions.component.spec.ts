import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalConditionsComponent } from './rental-conditions.component';

describe('RentalConditionsComponent', () => {
  let component: RentalConditionsComponent;
  let fixture: ComponentFixture<RentalConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
