import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPriceComponent } from './element-price.component';

describe('ElementPriceComponent', () => {
  let component: ElementPriceComponent;
  let fixture: ComponentFixture<ElementPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
