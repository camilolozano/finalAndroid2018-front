import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAvailablesOnlyreadingComponent } from './services-availables-onlyreading.component';

describe('ServicesAvailablesOnlyreadingComponent', () => {
  let component: ServicesAvailablesOnlyreadingComponent;
  let fixture: ComponentFixture<ServicesAvailablesOnlyreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAvailablesOnlyreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAvailablesOnlyreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
