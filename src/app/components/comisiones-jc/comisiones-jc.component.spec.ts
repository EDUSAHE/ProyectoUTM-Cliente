import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesJcComponent } from './comisiones-jc.component';

describe('ComisionesJcComponent', () => {
  let component: ComisionesJcComponent;
  let fixture: ComponentFixture<ComisionesJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionesJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
