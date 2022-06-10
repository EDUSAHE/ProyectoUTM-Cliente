import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoradosComponent } from './tutorados.component';

describe('TutoradosComponent', () => {
  let component: TutoradosComponent;
  let fixture: ComponentFixture<TutoradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
