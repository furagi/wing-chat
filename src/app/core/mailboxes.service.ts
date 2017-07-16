import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class MailboxesService {

  constructor(private _http: Http, private _auth: AuthService) {}

  all() {
    const token = this._auth.accessToken.value;
    const url = `${environment.apiUrl}/users/me/settings/sendAs`;
    this._http.get(url, { headers: this._auth.authHeaders });
  }

}
