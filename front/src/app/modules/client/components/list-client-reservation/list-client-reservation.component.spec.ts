import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientReservationComponent } from './list-client-reservation.component';

describe('ListClientReservationComponent', () => {
  let component: ListClientReservationComponent;
  let fixture: ComponentFixture<ListClientReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
