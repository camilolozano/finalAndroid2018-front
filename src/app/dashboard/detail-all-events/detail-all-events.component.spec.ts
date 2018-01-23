import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAllEventsComponent } from './detail-all-events.component';

describe('DetailAllEventsComponent', () => {
  let component: DetailAllEventsComponent;
  let fixture: ComponentFixture<DetailAllEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAllEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
