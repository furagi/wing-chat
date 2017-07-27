import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { UsersListComponent } from './users-list/users-list.component';
import { MailboxService } from './mailbox.service';
import { MailService } from './mail.service';
import { RootComponent } from './root/root.component';
import { MailboxesListComponent } from './mailboxes-list/mailboxes-list.component';
import { MailboxCardComponent } from './mailbox-card/mailbox-card.component';
import { coreRoutes } from './core.router';
import { DatePipe } from './date.pipe';
import { MailCardComponent } from './mail-card/mail-card.component';
import { MailsListComponent } from './mails-list/mails-list.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(coreRoutes)
  ],
  providers: [MailboxService, MailService],
  declarations: [
    UsersListComponent,
    RootComponent,
    MailboxesListComponent,
    MailboxCardComponent,
    DatePipe,
    MailCardComponent,
    MailsListComponent
  ]
})
export class CoreModule { }
