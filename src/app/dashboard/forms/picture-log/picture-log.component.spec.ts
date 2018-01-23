import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureLogComponent } from './picture-log.component';

describe('PictureLogComponent', () => {
  let component: PictureLogComponent;
  let fixture: ComponentFixture<PictureLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
