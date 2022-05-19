import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalesExportarComponent } from './modales-exportar.component';

describe('ModalesExportarComponent', () => {
  let component: ModalesExportarComponent;
  let fixture: ComponentFixture<ModalesExportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalesExportarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalesExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
