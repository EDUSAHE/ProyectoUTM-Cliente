import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventosJcComponent } from './listar-eventos-jc.component';

describe('ListarEventosJcComponent', () => {
  let component: ListarEventosJcComponent;
  let fixture: ComponentFixture<ListarEventosJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEventosJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEventosJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
