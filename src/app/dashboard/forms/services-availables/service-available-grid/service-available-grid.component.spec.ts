import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAvailableGridComponent } from './service-available-grid.component';

describe('ServiceAvailableGridComponent', () => {
  let component: ServiceAvailableGridComponent;
  let fixture: ComponentFixture<ServiceAvailableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAvailableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAvailableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
