import { TestBed, inject } from '@angular/core/testing';

import { MailboxesService } from './mailboxes.service';

describe('MailboxesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailboxesService]
    });
  });

  it('should be created', inject([MailboxesService], (service: MailboxesService) => {
    expect(service).toBeTruthy();
  }));
});
