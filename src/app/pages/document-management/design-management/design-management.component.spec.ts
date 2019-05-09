import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignManagementComponent } from './design-management.component';

describe('DesignManagementComponent', () => {
  let component: DesignManagementComponent;
  let fixture: ComponentFixture<DesignManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
