import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalesAgregarComponent } from './modales-agregar.component';

describe('ModalesAgregarComponent', () => {
  let component: ModalesAgregarComponent;
  let fixture: ComponentFixture<ModalesAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalesAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
