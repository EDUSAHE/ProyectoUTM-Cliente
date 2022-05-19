import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalesImportarComponent } from './modales-importar.component';

describe('ModalesImportarComponent', () => {
  let component: ModalesImportarComponent;
  let fixture: ComponentFixture<ModalesImportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalesImportarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalesImportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
