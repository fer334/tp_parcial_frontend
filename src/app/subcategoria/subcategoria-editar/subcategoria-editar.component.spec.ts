import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaEditarComponent } from './subcategoria-editar.component';

describe('SubcategoriaEditarComponent', () => {
  let component: SubcategoriaEditarComponent;
  let fixture: ComponentFixture<SubcategoriaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
