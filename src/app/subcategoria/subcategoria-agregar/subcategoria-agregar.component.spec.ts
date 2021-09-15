import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaAgregarComponent } from './subcategoria-agregar.component';

describe('SubcategoriaAgregarComponent', () => {
  let component: SubcategoriaAgregarComponent;
  let fixture: ComponentFixture<SubcategoriaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
