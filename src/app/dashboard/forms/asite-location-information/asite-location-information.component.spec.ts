import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiteLocationInformationComponent } from './asite-location-information.component';

describe('AsiteLocationInformationComponent', () => {
  let component: AsiteLocationInformationComponent;
  let fixture: ComponentFixture<AsiteLocationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsiteLocationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiteLocationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
