import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMateriaporsemestreComponent } from './list-materiaporsemestre.component';

describe('ListMateriaporsemestreComponent', () => {
  let component: ListMateriaporsemestreComponent;
  let fixture: ComponentFixture<ListMateriaporsemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMateriaporsemestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMateriaporsemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
