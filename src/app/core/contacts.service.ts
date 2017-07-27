import { Injectable } from '@angular/core';

@Injectable()
export class ContactsService {
  private _contacts: string[];
  constructor() {
    try {
      this._contacts = JSON.parse(localStorage.contacts);
    } catch (e) {
      this._contacts = [];
    }
  }

  private _save() {
    localStorage.contacts = JSON.stringify(this._contacts);
  }

  add(contact: string) {
    if (this._contacts.indexOf(contact) === -1) {
      this._contacts.push(contact);
      this._save();
    }
  }

  remove(contact: string) {
    this._contacts = this._contacts.filter((_contact) => _contact !== contact);
    this._save();
  }

  all() {
    return [...this._contacts];
  }

  search(query: string) {
    return this._contacts.filter((contact) => contact.includes(query));
  }

}
