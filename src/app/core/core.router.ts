import { Route } from '@angular/router';

import { MailboxesListComponent } from './mailboxes-list/mailboxes-list.component';
import { RootComponent } from './root/root.component';
import { AuthGuard } from '../shared/auth.guard';
import { MailsListComponent } from './mails-list/mails-list.component';
import { MailCardComponent } from './mail-card/mail-card.component';

export const coreRoutes: Route[] = [{
  path: 'app',
  component: RootComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'mailboxes',
    data: { title: 'Mailboxes' },
    component: MailboxesListComponent
  }, {
    path: 'mails',
    data: { title: 'Mails' },
    component: MailsListComponent
  }, {
    path: 'mails/:id',
    data: { title: 'Mails' },
    component: MailCardComponent
  }]
}];
