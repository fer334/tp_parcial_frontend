import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAgregarComponent } from './categoria-agregar.component';

describe('CategoriaAgregarComponent', () => {
  let component: CategoriaAgregarComponent;
  let fixture: ComponentFixture<CategoriaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
