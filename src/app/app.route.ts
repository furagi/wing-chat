import { Route } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { OauthCallbackComponent } from './login/oauth-callback/oauth-callback.component';
// import { MailsListComponent } from './mails-list/mails-list.component';
import { RootComponent } from './core/root/root.component';
import { AuthGuard } from './shared/auth.guard';
// import { MailComponent } from './mail/mail.component';
// import { UserComponent } from './user/user.component';
// import { UserFormComponent } from './user-form/user-form.component';

// const appRoutes: Route[] = [{
//   path: 'users/:id',
//   data: { title: 'Show user' },
//   // canActivate: [AuthGuard],
//   // component: UserComponent,
//   children: [{
//     path: 'edit',
//     data: { title: 'Edit user' },
//     // component: UserFormComponent
//   }]
// }, {
//   path: 'mails',
//   data: { title: 'Mails' },
//   // canActivate: [AuthGuard],
//   // component: MailsListComponent,
//   children: [{
//     path: ':id',
//     data: { title: 'Mails' },
//     // component: MailComponent
//   }]
// }];

const routes: Route[] = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  {
    path: 'login',
    data: {title: 'Login'},
    component: LoginComponent
  }, {
    path: 'oauth-callback',
    data: { title: 'Login' },
    component: OauthCallbackComponent
  }, {
    path: 'app',
    data: {title: 'Wing Chat'},
    canActivate: [AuthGuard],
    // children: appRoutes
    component: RootComponent
  }
];


export { routes };
