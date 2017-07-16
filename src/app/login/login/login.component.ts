import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _currentUser: AuthService) { }

  ngOnInit() {
    this._currentUser.login();
  }

}
