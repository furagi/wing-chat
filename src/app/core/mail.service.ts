import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';
import { Mailbox, Mail, Page } from '../../interfaces';

@Injectable()
export class MailService {
  constructor(private _http: Http, private _auth: AuthService) { }

  search(query: string, pageSize: number, pageToken?: string): Observable<Page<Mail>> {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/messages`;
    let nextPageToken: string;
    let resultSizeEstimate: number;
    return this._http.get(url, {
      headers: this._auth.authHeaders,
      params: { q: query, pageToken, maxResults: pageSize }
    })
      .flatMap((response) => {
        const json = response.json();
        const mails: Mail[] = json.messages;
        nextPageToken = json.nextPageToken;
        resultSizeEstimate = json.resultSizeEstimate;
        if (!(mails && mails.length > 0)) {
          return Observable.of([]);
        }
        const observables = mails.map((mail) => {
          return this._http.get(`${url}/${mail.id}`, { headers: this._auth.authHeaders });
        });
        return Observable.combineLatest(...observables);
      })
      .map(function(responses) {
        const mails = responses.map(function(response) {
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
        return {nextPageToken, resultSizeEstimate, list: mails};
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
