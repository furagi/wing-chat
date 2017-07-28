import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/auth.service';
import { ContactsService } from './contacts.service';
import { Mailbox, Mail, Page } from '../../../interfaces';

@Injectable()
export class MailService {
  constructor(private _http: Http, private _auth: AuthService, private _contacts: ContactsService) { }

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
      .map((responses) => {
        const mails = responses.map((response) => {
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
          this._contacts.add(mail.from);
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

  findById(id: string): Observable<Mail> {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/messages/${id}`;
    return this._http.get(url, {
      headers: this._auth.authHeaders
    })
      .map(function (response) {
        const mail = response.json();
        const headers: { [type: string]: string } = {};
        mail.payload.headers.forEach(function (header) {
          headers[header.name] = header.value;
        });
        mail.id = mail.id;
        let body = mail.payload.body;
        if (body.size) {
          try {
            body = body.replace(/-/g, '+').replace(/_/g, '/');
            mail.body = atob(body.data);
          } catch (e) {
            mail.body = '';
          }
        } else if (mail.payload.parts) {
          try {
            const bodies: { [type: string]: string } = {};
            mail.payload.parts.forEach(function(part) {
              if (!bodies[part.mimeType]) {
                bodies[part.mimeType] = '';
              }
              const base64String = part.body.data.replace(/-/g, '+').replace(/_/g, '/');
              bodies[part.mimeType] += atob(base64String);
            });
            if (bodies['text/html']) {
              mail.body = bodies['text/html'];
            } else if (bodies['text/plain']) {
              mail.body = bodies['text/plain'];
            } else {
              mail.body = bodies[Object.keys(bodies)[0]] || '';
            }
          } catch (e) {
            console.error(e);
          }
        }
        mail.date = +mail.internalDate;
        mail.to = headers['Delivered-To'];
        mail.from = headers.From;
        mail.subject = headers.Subject;
        return mail;
      });
  }

  send(mail: Mail) {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/messages/send`;
    const data = `From: ${mail.from}\r\nTo: ${mail.to}\r\nSubject: ${mail.subject}\r\n${mail.body}`;
    this._contacts.add(mail.to);
    return this._http.post(url,
      { raw: btoa(data).replace(/\+/g, '-').replace(/\//g, '_') },
      { headers: this._auth.authHeaders })
      .map((response) => {
        return response.json();
      });
  }

}
