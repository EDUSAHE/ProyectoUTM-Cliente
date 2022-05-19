import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProfesoresJcComponent } from './listar-profesores-jc.component';

describe('ListarProfesoresJcComponent', () => {
  let component: ListarProfesoresJcComponent;
  let fixture: ComponentFixture<ListarProfesoresJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProfesoresJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProfesoresJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
