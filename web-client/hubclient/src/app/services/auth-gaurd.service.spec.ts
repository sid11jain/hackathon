import { TestBed } from '@angular/core/testing';

import { AuthGaurdService } from './auth-gaurd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGaurdService', () => {
  let service: AuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,  RouterTestingModule]
    });
    service = TestBed.inject(AuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
