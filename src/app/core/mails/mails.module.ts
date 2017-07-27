import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MailCardComponent } from './mail-card/mail-card.component';
import { MailsListComponent } from './mails-list/mails-list.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { SafeHtmlPipe } from './safe-html.pipe';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    MailCardComponent,
    MailsListComponent,
    NewMailComponent,
    SafeHtmlPipe
  ]
})
export class MailsModule { }
