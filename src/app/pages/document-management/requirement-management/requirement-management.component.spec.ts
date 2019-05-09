import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementManagementComponent } from './requirement-management.component';

describe('RequirementManagementComponent', () => {
  let component: RequirementManagementComponent;
  let fixture: ComponentFixture<RequirementManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
