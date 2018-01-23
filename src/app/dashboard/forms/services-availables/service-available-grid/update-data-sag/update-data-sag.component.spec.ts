import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDataSagComponent } from './update-data-sag.component';

describe('UpdateDataSagComponent', () => {
  let component: UpdateDataSagComponent;
  let fixture: ComponentFixture<UpdateDataSagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDataSagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDataSagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
