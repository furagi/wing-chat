import { Injectable } from '@angular/core';
import { URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Token } from '../../interfaces';

@Injectable()
export class AuthService {
  constructor(private _router: Router) { }

  get accessToken() {
    let token: Token;
    try {
      token = JSON.parse(localStorage.accessToken);
    } catch (e) {
      return undefined;
    }
    if (token.expiry > Date.now()) {
      return token;
    }
  }

  login() {
    const params = {
      client_id: environment.clientId,
      redirect_uri: `${window.location.origin}/oauth-callback`,
      scope: environment.scope.join(' '),
      response_type: 'token'
    };
    const urlParams = new URLSearchParams();
    for (const key in params) {
      if (params[key]) {
        urlParams.set(key, params[key]);
      }
    }
    window.location.href = `${environment.oAuthUrl}?${urlParams.toString()}`;
  }

  oAuthCallback() {
    const response: any = {};
    window.location.hash.substr(1).split('&').forEach(function(part) {
      const keyValue = part.split('=');
      if (keyValue.length > 1) {
        response[keyValue[0]] = keyValue.slice(1).join('=');
      }
    });
    localStorage.accessToken = JSON.stringify({
      value: response.access_token,
      expiry: Date.now() + response.expires_in * 1000,
      type: response.token_type
    });
    setTimeout(() => {
      this.login();
    }, response.expires_in * 1000);
    this._router.navigate(['/app/mailboxes']);
  }

  get authHeaders() {
    return new Headers({ Authorization: `Bearer ${this.accessToken.value}` });
  }
}
