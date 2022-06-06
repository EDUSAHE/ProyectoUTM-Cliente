import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriaComponent } from './asignar-materia.component';

describe('AsignarMateriaComponent', () => {
  let component: AsignarMateriaComponent;
  let fixture: ComponentFixture<AsignarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
