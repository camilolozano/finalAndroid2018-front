import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureInformationComponent } from './structure-information.component';

describe('StructureInformationComponent', () => {
  let component: StructureInformationComponent;
  let fixture: ComponentFixture<StructureInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
