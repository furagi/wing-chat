import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';


import { Mail } from '../../../interfaces';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-mails-list',
  templateUrl: './mails-list.component.html',
  styleUrls: ['./mails-list.component.css']
})
export class MailsListComponent implements OnInit {
  searchQuery: FormControl;
  mails: Mail[];
  selectedMails: { [type: string]: boolean } = {};
  allMailsSelected = false;
  private _to: string;
  constructor(private _route: ActivatedRoute, private _mailService: MailService) { }

  ngOnInit() {
    this._route.queryParamMap
      .switchMap((params: ParamMap) => {
        this._to = params.get('to');
        return this._mailService.search(`to:(${this._to})`);
      })
      .subscribe((mails) => this.mails = mails );

    this.searchQuery = new FormControl('');
    this.searchQuery.valueChanges
      .debounceTime(350)
      .distinctUntilChanged()
      .switchMap((query) => this._mailService.search(`to:(${this._to}) ${query}`))
      .subscribe((mails) => this.mails = mails);
  }

  toggleAllMails() {
    console.log(this.allMailsSelected);
    if (!this.mails) {
      return;
    }
    if (this.allMailsSelected) {
      this.mails.forEach((mail) => {
        this.selectedMails[mail.id] = true;
      });
    } else {
      this.selectedMails = {};
    }
  }

  deleteMails() {
    const mails = this.mails.filter((mail) => this.selectedMails[mail.id]);
    if (mails.length === 0) {
      return;
    }
    this._mailService.remove(mails)
      .subscribe((ids) => {
        this.mails = this.mails.filter((mail) => ids.indexOf(mail.id) === -1);
      });
  }

  search() {

  }

}
