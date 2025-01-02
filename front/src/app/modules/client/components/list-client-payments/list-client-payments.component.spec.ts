import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientPaymentsComponent } from './list-client-payments.component';

describe('ListClientPaymentsComponent', () => {
  let component: ListClientPaymentsComponent;
  let fixture: ComponentFixture<ListClientPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
