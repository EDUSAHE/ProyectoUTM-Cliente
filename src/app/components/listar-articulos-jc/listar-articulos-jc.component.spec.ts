import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarArticulosJcComponent } from './listar-articulos-jc.component';

describe('ListarArticulosJcComponent', () => {
  let component: ListarArticulosJcComponent;
  let fixture: ComponentFixture<ListarArticulosJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarArticulosJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArticulosJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
