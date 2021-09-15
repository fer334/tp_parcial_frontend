import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEliminarComponent } from './categoria-eliminar.component';

describe('CategoriaEliminarComponent', () => {
  let component: CategoriaEliminarComponent;
  let fixture: ComponentFixture<CategoriaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
