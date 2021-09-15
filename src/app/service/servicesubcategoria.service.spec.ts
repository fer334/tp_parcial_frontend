import { TestBed } from '@angular/core/testing';

import { ServicesubcategoriaService } from './servicesubcategoria.service';

describe('ServicesubcategoriaService', () => {
  let service: ServicesubcategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesubcategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
