import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAvailablesComponent } from './services-availables.component';

describe('ServicesAvailablesComponent', () => {
  let component: ServicesAvailablesComponent;
  let fixture: ComponentFixture<ServicesAvailablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAvailablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAvailablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
