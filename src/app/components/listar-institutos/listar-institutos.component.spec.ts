import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstitutosComponent } from './listar-institutos.component';

describe('ListarInstitutosComponent', () => {
  let component: ListarInstitutosComponent;
  let fixture: ComponentFixture<ListarInstitutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInstitutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInstitutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
