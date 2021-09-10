import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaEliminarComponent } from './subcategoria-eliminar.component';

describe('SubcategoriaEliminarComponent', () => {
  let component: SubcategoriaEliminarComponent;
  let fixture: ComponentFixture<SubcategoriaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriaEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
