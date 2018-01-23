import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundOnlyreadingComponent } from './compound-onlyreading.component';

describe('CompoundOnlyreadingComponent', () => {
  let component: CompoundOnlyreadingComponent;
  let fixture: ComponentFixture<CompoundOnlyreadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundOnlyreadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundOnlyreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
