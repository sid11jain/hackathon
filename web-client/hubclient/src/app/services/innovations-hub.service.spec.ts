import { TestBed } from '@angular/core/testing';

import { InnovationsHubService } from './innovations-hub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('InnovationsHubService', () => {
  let service: InnovationsHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [DatePipe]
    });
    service = TestBed.inject(InnovationsHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
