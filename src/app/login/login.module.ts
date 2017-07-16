import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, OauthCallbackComponent]
})
export class LoginModule { }
