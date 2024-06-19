import { TestBed } from '@angular/core/testing';

import { FrameBuilderService } from './frame-builder.service';

describe('FrameBuilderService', () => {
  let service: FrameBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
