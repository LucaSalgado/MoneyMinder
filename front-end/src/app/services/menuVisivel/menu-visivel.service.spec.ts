import { TestBed } from '@angular/core/testing';

import { MenuVisivelService } from './menu-visivel.service';

describe('MenuVisivelService', () => {
  let service: MenuVisivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuVisivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
