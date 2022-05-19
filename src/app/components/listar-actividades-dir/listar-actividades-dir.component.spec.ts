import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarActividadesDirComponent } from './listar-actividades-dir.component';

describe('ListarActividadesDirComponent', () => {
  let component: ListarActividadesDirComponent;
  let fixture: ComponentFixture<ListarActividadesDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarActividadesDirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarActividadesDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
