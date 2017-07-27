import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';
import { Mailbox, Mail } from '../../interfaces';

@Injectable()
export class MailService {
  constructor(private _http: Http, private _auth: AuthService) { }

  search(query: string): Observable<Mail[]> {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/messages`;
    console.log(query);
    return this._http.get(url, {
      headers: this._auth.authHeaders,
      params: { q: query }
    })
      .flatMap((response) => {
        const mails: Mail[] = response.json().messages;
        if (!(mails && mails.length > 0)) {
          return Observable.of([]);
        }
        const observables = mails.map((mail) => {
          return this._http.get(`${url}/${mail.id}`, { headers: this._auth.authHeaders });
        });
        return Observable.combineLatest(...observables);
      })
      .map(function(responses) {
        return responses.map(function(response) {
          const mail = response.json();
          const headers: { [type: string]: string } = {};
          mail.payload.headers.forEach(function (header) {
            headers[header.name] = header.value;
          });
          mail.id = mail.id;
          mail.body = mail.snippet;
          mail.date = +mail.internalDate;
          mail.to = headers['Delivered-To'];
          mail.from = headers.From;
          mail.subject = headers.Subject;
          return mail;
        });
      });
  }

  remove(mails: Mail[]): Observable<string[]> {
    const token = this._auth.accessToken.value;
    const ids = mails.map((mail) => mail.id);
    const url = `${environment.apiUrl}/users/me/messages/batchDelete`;
    return this._http.post(url, {ids}, {
      headers: this._auth.authHeaders
    })
      .map(function(response) {
        return ids;
      });
  }

}
