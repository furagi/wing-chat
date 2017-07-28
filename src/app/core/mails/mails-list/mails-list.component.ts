import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

import { Mail, Page } from '../../../../interfaces';
import { MailService } from '../../shared/mail.service';
import { NewMailComponent } from '../new-mail/new-mail.component';

@Component({
  selector: 'app-mails-list',
  templateUrl: './mails-list.component.html',
  styleUrls: ['./mails-list.component.css']
})
export class MailsListComponent implements OnInit {
  searchQuery: FormControl;
  currentPage: Page<Mail>;
  selectedMails: { [type: string]: boolean } = {};
  allMailsSelected = false;
  pageSize = 25;
  pageTokens: string[] = [undefined];
  queryText = '';
  private _to: string;
  constructor(
    private _route: ActivatedRoute,
    private _dialog: MdDialog,
    private _mailService: MailService) { }

  private set _page(page: Page<Mail>) {
    this.currentPage = page;
    if (page.nextPageToken) {
      this.pageTokens.push(page.nextPageToken);
    };
  }

  ngOnInit() {
    this._route.queryParamMap
      .switchMap((params: ParamMap) => {
        this._to = params.get('to');
        return this._mailService.search(`to:(${this._to})`, this.pageSize);
      })
      .subscribe((page) => {
        this._page = page;
      });

    this.searchQuery = new FormControl('');
    this.searchQuery.valueChanges
      .debounceTime(350)
      .distinctUntilChanged()
      .switchMap((query) => {
        this.currentPage = undefined;
        return this._mailService.search(`to:(${this._to}) ${query}`, this.pageSize)
      })
      .subscribe((page) => {
        this.pageTokens = [undefined]
        this._page = page;
      });
  }

  toggleAllMails() {
    if (!this.currentPage) {
      return;
    }
    if (this.allMailsSelected) {
      this.currentPage.list.forEach((mail) => {
        this.selectedMails[mail.id] = true;
      });
    } else {
      this.selectedMails = {};
    }
  }

  deleteMails() {
    const mails = this.currentPage.list.filter((mail) => this.selectedMails[mail.id]);
    if (mails.length === 0) {
      return;
    }
    this._mailService.remove(mails)
      .subscribe((ids) => {
        this.currentPage.list = this.currentPage.list.filter((mail) => ids.indexOf(mail.id) === -1);
      });
  }

  changePage({pageSize, pageIndex}: {pageIndex: number, pageSize: number}) {
    this.currentPage = undefined;
    if (pageSize !== this.pageSize) {
      this.pageTokens = [undefined];
      pageIndex = 0;
    } else if (pageIndex < this.pageTokens.length - 1) {
      pageIndex--;
      this.pageTokens.pop();
    }
    this.pageSize = pageSize;
    this._mailService.search(`to:(${this._to})`, this.pageSize, this.pageTokens[pageIndex])
      .subscribe((page) => this._page = page);
  }

  get mailsAmount(): number {
    if (!this.currentPage) {
      return 0;
    }
    return (this.pageTokens.length - 1) * this.pageSize + this.currentPage.resultSizeEstimate;
  }

  showNewMailForm() {
    this._dialog.open(NewMailComponent);
  }
}
