import { TestBed } from '@angular/core/testing';

import { CheckAnswerService } from './check-answer.service';

describe('CheckAnswerService', () => {
  let service: CheckAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
