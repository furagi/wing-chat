import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MailboxCardComponent } from './mailbox-card/mailbox-card.component';
import { MailboxesListComponent } from './mailboxes-list/mailboxes-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    MailboxesListComponent,
    MailboxCardComponent,
  ],
  providers: []
})
export class MailboxesModule { }
