import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {

  constructor(private _currentUser: AuthService) { }

  ngOnInit() {
    this._currentUser.oAuthCallback();
  }

}
