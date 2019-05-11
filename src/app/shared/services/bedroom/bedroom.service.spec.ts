import { TestBed } from '@angular/core/testing';

import { BedroomService } from './bedroom.service';

describe('BedroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BedroomService = TestBed.get(BedroomService);
    expect(service).toBeTruthy();
  });
});
