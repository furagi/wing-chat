import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ContactsService } from '../../shared/contacts.service';
import { MailService } from '../../shared/mail.service';
import { MailboxService } from '../../shared/mailbox.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  to: FormControl;
  subject: FormControl;
  body: FormControl;
  newMailForm: FormGroup;
  fromAddresses: string[];
  filteredContacts: Observable<string[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private _mails: MailService,
    private _mailboxes: MailboxService,
    private _contacts: ContactsService) { }

  ngOnInit() {
    this.fromAddresses = this._mailboxes.mailboxes.map( mailbox => mailbox.sendAsEmail);
    this.newMailForm = new FormGroup({
      to: new FormControl('', [Validators.required, emailValidator]),
      subject: new FormControl(''),
      body: new FormControl('')
    });
    this.filteredContacts = this.newMailForm.get('to').valueChanges
      .startWith(this._contacts.all())
      .map(val => this._contacts.search(val));
  }

  send() {
    if (!this.newMailForm.valid) {
      return;
    }
    this._mails.send({ ...this.newMailForm.value, from: this.fromAddresses[0] })
      .subscribe(function(result) {
        console.log(result);
      }, (err) => {
        console.error(err);
      });
  }

}

function emailValidator(formControl: FormControl) {
  const value: string = formControl.value;
  const error = { email: { error: 'invalid email' } };
  if (!value || typeof value !== 'string' || !value.match(/.+@.+\..+/i)) {
    return error;
  }
  return null;
}
