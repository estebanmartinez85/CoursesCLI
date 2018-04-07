import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterMeetingWaitingComponent } from './writer-meeting-waiting.component';

describe('WriterMeetingWaitingComponent', () => {
  let component: WriterMeetingWaitingComponent;
  let fixture: ComponentFixture<WriterMeetingWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterMeetingWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterMeetingWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
