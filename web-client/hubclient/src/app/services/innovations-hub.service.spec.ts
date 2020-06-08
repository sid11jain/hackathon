import { TestBed } from '@angular/core/testing';

import { InnovationsHubService } from './innovations-hub.service';

describe('InnovationsHubService', () => {
  let service: InnovationsHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnovationsHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
