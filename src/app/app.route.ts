import { Route } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { OauthCallbackComponent } from './login/oauth-callback/oauth-callback.component';
import { RootComponent } from './core/root/root.component';

const routes: Route[] = [
  { path: '', redirectTo: '/app/mailboxes', pathMatch: 'full' },
  {
    path: 'login',
    data: {title: 'Login'},
    component: LoginComponent
  }, {
    path: 'oauth-callback',
    data: { title: 'Login' },
    component: OauthCallbackComponent
  }];

export { routes };
