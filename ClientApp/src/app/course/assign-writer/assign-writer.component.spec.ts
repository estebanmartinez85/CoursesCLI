import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWriterComponent } from './assign-writer.component';

describe('AssignWriterComponent', () => {
  let component: AssignWriterComponent;
  let fixture: ComponentFixture<AssignWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
