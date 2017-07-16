import { Component, OnInit } from '@angular/core';

import { MailboxesService } from '../mailboxes.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private _mailboxesService: MailboxesService) { }

  ngOnInit() {
    this._mailboxesService.all();
  }

}
