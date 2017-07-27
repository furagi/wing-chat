import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-mail-card',
  templateUrl: './mail-card.component.html',
  styleUrls: ['./mail-card.component.css']
})
export class MailCardComponent implements OnInit {
  mail: Mail;
  constructor(private _route: ActivatedRoute, private _mailService: MailService) { }

  ngOnInit() {
    this._route.paramMap
      .switchMap((params: ParamMap) => {
        this.mail = undefined;
        return this._mailService.findById(params.get('id'));
      })
      .subscribe((mail) => {
        this.mail = mail;
      });
  }

}
