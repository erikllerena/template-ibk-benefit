import { TestBed } from '@angular/core/testing';

import { ApiFromJsonService } from './api-from-json.service';

describe('ApiFromJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFromJsonService = TestBed.get(ApiFromJsonService);
    expect(service).toBeTruthy();
  });
});
