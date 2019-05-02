import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskPageComponent } from './all-task-page.component';

describe('AllTaskPageComponent', () => {
  let component: AllTaskPageComponent;
  let fixture: ComponentFixture<AllTaskPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
