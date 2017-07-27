import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxesListComponent } from './mailboxes-list.component';

describe('MailboxesListComponent', () => {
  let component: MailboxesListComponent;
  let fixture: ComponentFixture<MailboxesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
