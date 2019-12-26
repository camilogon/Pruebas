import { TestBed } from '@angular/core/testing';

import { ServiceClientService } from './service-client.service';

describe('ServiceClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceClientService = TestBed.get(ServiceClientService);
    expect(service).toBeTruthy();
  });
});
