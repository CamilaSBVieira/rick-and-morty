import { TestBed } from '@angular/core/testing';

import { FavCharactersService } from './fav-characters.service'

describe('FavCharactersService', () => {
  let service: FavCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
