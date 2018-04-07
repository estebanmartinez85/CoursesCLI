import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWriterMeetingComponent } from './schedule-writer-meeting.component';

describe('ScheduleWriterMeetingComponent', () => {
  let component: ScheduleWriterMeetingComponent;
  let fixture: ComponentFixture<ScheduleWriterMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWriterMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWriterMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
