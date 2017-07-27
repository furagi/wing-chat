import { Component, OnInit } from '@angular/core';

import { Mailbox } from '../../../interfaces';
import { MailboxService } from '../mailbox.service';

@Component({
  selector: 'app-mailboxes-list',
  templateUrl: './mailboxes-list.component.html',
  styleUrls: ['./mailboxes-list.component.css']
})
export class MailboxesListComponent implements OnInit {
  mailboxes: Mailbox[];
  constructor(private _mailboxService: MailboxService) { }

  ngOnInit() {
    this.mailboxes = this._mailboxService.mailboxes;
  }
}
