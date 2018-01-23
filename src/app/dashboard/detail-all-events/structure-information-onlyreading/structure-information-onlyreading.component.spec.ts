import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureInformationOnlyreadingComponent } from './structure-information-onlyreading.component';

describe('StructureInformationOnlyreadingComponent', () => {
  let component: StructureInformationOnlyreadingComponent;
  let fixture: ComponentFixture<StructureInformationOnlyreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureInformationOnlyreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureInformationOnlyreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
