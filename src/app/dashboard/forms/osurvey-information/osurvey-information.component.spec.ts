import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsurveyInformationComponent } from './osurvey-information.component';

describe('OsurveyInformationComponent', () => {
  let component: OsurveyInformationComponent;
  let fixture: ComponentFixture<OsurveyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsurveyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsurveyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
