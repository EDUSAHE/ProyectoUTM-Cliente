import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArticulosPorInstitutoComponent } from './listar-articulos-por-instituto.component';

describe('ListarArticulosPorInstitutoComponent', () => {
  let component: ListarArticulosPorInstitutoComponent;
  let fixture: ComponentFixture<ListarArticulosPorInstitutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarArticulosPorInstitutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArticulosPorInstitutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
