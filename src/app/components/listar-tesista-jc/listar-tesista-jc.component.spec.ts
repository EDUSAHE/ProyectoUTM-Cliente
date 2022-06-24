import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTesistaJcComponent } from './listar-tesista-jc.component';

describe('ListarTesistaJcComponent', () => {
  let component: ListarTesistaJcComponent;
  let fixture: ComponentFixture<ListarTesistaJcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTesistaJcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTesistaJcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
