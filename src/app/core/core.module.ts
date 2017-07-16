import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './users-list/users-list.component';
import { MailboxesService } from './mailboxes.service';
import { RootComponent } from './root/root.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ MailboxesService ],
  declarations: [UsersListComponent, RootComponent]
})
export class CoreModule { }
