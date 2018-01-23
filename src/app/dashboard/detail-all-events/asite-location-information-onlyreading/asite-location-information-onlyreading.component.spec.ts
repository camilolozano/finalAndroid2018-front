import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiteLocationInformationOnlyreadingComponent } from './asite-location-information-onlyreading.component';

describe('AsiteLocationInformationOnlyreadingComponent', () => {
  let component: AsiteLocationInformationOnlyreadingComponent;
  let fixture: ComponentFixture<AsiteLocationInformationOnlyreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsiteLocationInformationOnlyreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiteLocationInformationOnlyreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
