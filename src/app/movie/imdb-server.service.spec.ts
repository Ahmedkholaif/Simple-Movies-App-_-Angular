import { TestBed } from '@angular/core/testing';

import { ImdbServerService } from './imdb-server.service';

describe('ImdbServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImdbServerService = TestBed.get(ImdbServerService);
    expect(service).toBeTruthy();
  });
});
