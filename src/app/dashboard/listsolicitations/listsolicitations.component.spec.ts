import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsolicitationsComponent } from './listsolicitations.component';

describe('ListsolicitationsComponent', () => {
  let component: ListsolicitationsComponent;
  let fixture: ComponentFixture<ListsolicitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsolicitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsolicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
