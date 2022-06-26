import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTutoradosJcComponent } from './listar-tutorados-jc.component';

describe('ListarTutoradosJcComponent', () => {
  let component: ListarTutoradosJcComponent;
  let fixture: ComponentFixture<ListarTutoradosJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTutoradosJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTutoradosJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
