import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapplicationlistComponent } from './jobapplicationlist.component';

describe('JobapplicationlistComponent', () => {
  let component: JobapplicationlistComponent;
  let fixture: ComponentFixture<JobapplicationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobapplicationlistComponent]
    });
    fixture = TestBed.createComponent(JobapplicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
