import { TestBed, inject } from '@angular/core/testing';

import { AriproxyService } from './ariproxy.service';

describe('AriproxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AriproxyService]
    });
  });

  it('should be created', inject([AriproxyService], (service: AriproxyService) => {
    expect(service).toBeTruthy();
  }));
});
