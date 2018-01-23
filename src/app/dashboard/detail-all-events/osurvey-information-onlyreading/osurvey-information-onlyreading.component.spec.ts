import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsurveyInformationOnlyreadingComponent } from './osurvey-information-onlyreading.component';

describe('OsurveyInformationOnlyreadingComponent', () => {
  let component: OsurveyInformationOnlyreadingComponent;
  let fixture: ComponentFixture<OsurveyInformationOnlyreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsurveyInformationOnlyreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsurveyInformationOnlyreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
