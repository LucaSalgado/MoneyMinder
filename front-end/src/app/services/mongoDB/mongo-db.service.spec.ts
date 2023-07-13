import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MongoDBService } from './mongo-db.service';

describe('MongoDBService', () => {
  let service: MongoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MongoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
