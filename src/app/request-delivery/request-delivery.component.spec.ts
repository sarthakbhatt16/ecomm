import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeliveryComponent } from './request-delivery.component';

describe('RequestDeliveryComponent', () => {
  let component: RequestDeliveryComponent;
  let fixture: ComponentFixture<RequestDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
