import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRowSaComponent } from './delete-row-sa.component';

describe('DeleteRowSaComponent', () => {
  let component: DeleteRowSaComponent;
  let fixture: ComponentFixture<DeleteRowSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRowSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRowSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
