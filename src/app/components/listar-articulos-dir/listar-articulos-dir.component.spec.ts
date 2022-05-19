import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArticulosDirComponent } from './listar-articulos-dir.component';

describe('ListarArticulosDirComponent', () => {
  let component: ListarArticulosDirComponent;
  let fixture: ComponentFixture<ListarArticulosDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarArticulosDirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArticulosDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
