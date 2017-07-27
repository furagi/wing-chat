import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Mailbox } from '../../../interfaces';
import { MailboxService } from '../mailbox.service';

@Component({
  selector: 'app-mailbox-card',
  templateUrl: './mailbox-card.component.html',
  styleUrls: ['./mailbox-card.component.css']
})
export class MailboxCardComponent implements OnInit {
  loading = true;
  error: Error;
  @Input() mailbox: Mailbox;
  mailboxMetadata: Mailbox;
  constructor(private _mailboxService: MailboxService) { }

  ngOnInit() {
    this._mailboxService.loadMailbox(this.mailbox).subscribe((mailbox) => {
      this.mailboxMetadata = mailbox;
    }, (err) => {
      this.error = err;
    }, () => {
      this.loading = false;
    });
  }

  hasName() {
    return this.mailbox.displayName && this.mailbox.displayName !== '';
  }

}
