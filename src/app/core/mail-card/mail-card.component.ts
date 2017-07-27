import { Component, OnInit, Input } from '@angular/core';

import { Mail } from '../../../interfaces';

@Component({
  selector: 'app-mail-card',
  templateUrl: './mail-card.component.html',
  styleUrls: ['./mail-card.component.css']
})
export class MailCardComponent implements OnInit {
  @Input() mail: Mail;
  constructor() { }

  ngOnInit() {
  }

}
