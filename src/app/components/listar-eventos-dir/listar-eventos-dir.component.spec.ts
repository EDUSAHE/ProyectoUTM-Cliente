import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventosDirComponent } from './listar-eventos-dir.component';

describe('ListarEventosDirComponent', () => {
  let component: ListarEventosDirComponent;
  let fixture: ComponentFixture<ListarEventosDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEventosDirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEventosDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
