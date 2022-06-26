import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasJcComponent } from './materias-jc.component';

describe('MateriasJcComponent', () => {
  let component: MateriasJcComponent;
  let fixture: ComponentFixture<MateriasJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriasJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
