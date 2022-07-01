import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaJefeComponent } from './asignar-materia-jefe.component';

describe('AsignarMateriaJefeComponent', () => {
  let component: AsignarMateriaJefeComponent;
  let fixture: ComponentFixture<AsignarMateriaJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarMateriaJefeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarMateriaJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
