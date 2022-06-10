import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesistasComponent } from './tesistas.component';

describe('TesistasComponent', () => {
  let component: TesistasComponent;
  let fixture: ComponentFixture<TesistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
