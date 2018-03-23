import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffersCompaniesComponent } from './list-offers-companies.component';

describe('ListOffersCompaniesComponent', () => {
  let component: ListOffersCompaniesComponent;
  let fixture: ComponentFixture<ListOffersCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOffersCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOffersCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
