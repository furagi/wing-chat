import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailCardComponent } from './mail-card.component';

describe('MailCardComponent', () => {
  let component: MailCardComponent;
  let fixture: ComponentFixture<MailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
