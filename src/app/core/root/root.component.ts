import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Mailbox } from '../../../interfaces';
import { MailboxService } from '../shared/mailbox.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  error: Error;
  loading: boolean;
  constructor(private _mailboxService: MailboxService, private _router: Router) { }

  ngOnInit() {
    this.loading = true;
    this._mailboxService.load()
    .subscribe((result) => {
      this.error = null;
      this.loading = false;
      this._router.navigate(['/app/mailboxes']);
    }, (err) => {
      this.error = err;
      this.loading = false;
    });
  }

}
