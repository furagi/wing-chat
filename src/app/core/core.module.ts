import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { ContactsService } from './contacts.service';
import { MailService } from './mail.service';
import { MailboxCardComponent } from './mailbox-card/mailbox-card.component';
import { MailboxService } from './mailbox.service';
import { MailboxesListComponent } from './mailboxes-list/mailboxes-list.component';
import { RootComponent } from './root/root.component';
import { UsersListComponent } from './users-list/users-list.component';
import { coreRoutes } from './core.router';
import { DatePipe } from './date.pipe';
import { MailCardComponent } from './mail-card/mail-card.component';
import { MailsListComponent } from './mails-list/mails-list.component';
import { SafeHtmlPipe } from './safe-html.pipe';

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
  providers: [MailboxService, MailService, ContactsService],
  declarations: [
    UsersListComponent,
    RootComponent,
    MailboxesListComponent,
    MailboxCardComponent,
    DatePipe,
    MailCardComponent,
    MailsListComponent,
    SafeHtmlPipe
  ]
})
export class CoreModule { }
