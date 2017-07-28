import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { MailsModule } from './mails/mails.module';
import { RootComponent } from './root/root.component';
import { UsersListComponent } from './users-list/users-list.component';
import { coreRoutes } from './core.router';
import { MailboxesModule } from './mailboxes/mailboxes.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(coreRoutes),
    SharedModule,
    MailsModule,
    MailboxesModule
  ],
  declarations: [
    UsersListComponent,
    RootComponent
  ]
})
export class CoreModule { }
