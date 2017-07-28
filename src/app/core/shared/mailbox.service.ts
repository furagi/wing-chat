import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';

import { environment } from '../../../environments/environment';
import { Mailbox } from '../../../interfaces';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class MailboxService {
  private _mailboxes: Mailbox[];
  constructor(private _http: Http, private _auth: AuthService) {}

  load() {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/settings/sendAs`;
    return this._http.get(url, { headers: this._auth.authHeaders })
    .map((response) => {
      this._mailboxes = response.json().sendAs;
      return this._mailboxes;
    });
  }

  get mailboxes() {
    return [ ...this._mailboxes ];
  }

  loadMailbox(mailbox: Mailbox): Observable<Mailbox> {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/messages`;
    return this._http.get(url, {
      headers: this._auth.authHeaders,
      params: { maxResults: 1, q: `is:unread to:(${mailbox.sendAsEmail})` }
      })
      .flatMap((response) => {
        const json = response.json();
        mailbox.unreadedCount = json.resultSizeEstimate;
        if (json.messages) {
          mailbox.unreadedCount += 1;
        }
        return this._http.get(url, {
          headers: this._auth.authHeaders,
          params: { maxResults: 1, q: `to:(${mailbox.sendAsEmail})` }
        });
      })
      .flatMap((response) => {
        const mails = response.json().messages;
        if (!(mails && mails.length > 0)) {
          return;
        }
        return this._http.get(`${url}/${mails[0].id}`, { headers: this._auth.authHeaders });
      })
      .map((response) => {
        const mail = response.json();
        const headers: { [type: string]: string } = {};
        mail.payload.headers.forEach(function(header) {
          headers[header.name] = header.value;
        });
        mailbox.lastMail = {
          id: mail.id,
          body: mail.snippet,
          date: +mail.internalDate,
          to: headers['Delivered-To'],
          from: headers.From,
          subject: headers.Subject
        };
        return mailbox;
      });
  }

}

