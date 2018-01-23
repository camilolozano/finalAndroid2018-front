import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllEventsComponent } from './edit-all-events.component';

describe('EditAllEventsComponent', () => {
  let component: EditAllEventsComponent;
  let fixture: ComponentFixture<EditAllEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAllEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
