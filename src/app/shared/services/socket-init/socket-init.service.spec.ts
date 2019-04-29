import { TestBed } from '@angular/core/testing';

import { SocketInitService } from './socket-init.service';

describe('SocketInitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketInitService = TestBed.get(SocketInitService);
    expect(service).toBeTruthy();
  });
});
