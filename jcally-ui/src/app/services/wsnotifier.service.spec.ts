import { TestBed, inject } from '@angular/core/testing';

import { WsnotifierService } from './wsnotifier.service';

describe('WsnotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsnotifierService]
    });
  });

  it('should be created', inject([WsnotifierService], (service: WsnotifierService) => {
    expect(service).toBeTruthy();
  }));
});
