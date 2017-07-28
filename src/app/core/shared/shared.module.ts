import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ContactsService } from './contacts.service';
import { MailService } from './mail.service';
import { MailboxService } from './mailbox.service';
import { DatePipe } from './date.pipe';

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  declarations: [
    DatePipe,
  ],
  providers: [MailService, ContactsService, MailboxService]
})
export class SharedModule { }
