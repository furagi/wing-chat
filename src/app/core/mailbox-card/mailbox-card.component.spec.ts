import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxCardComponent } from './mailbox-card.component';

describe('MailboxCardComponent', () => {
  let component: MailboxCardComponent;
  let fixture: ComponentFixture<MailboxCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
