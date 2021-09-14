import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaEditarComponent } from './ficha-clinica-editar.component';

describe('FichaClinicaEditarComponent', () => {
  let component: FichaClinicaEditarComponent;
  let fixture: ComponentFixture<FichaClinicaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaClinicaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaClinicaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
