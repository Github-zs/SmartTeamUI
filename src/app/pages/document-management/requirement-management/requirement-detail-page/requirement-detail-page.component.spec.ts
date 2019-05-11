import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDetailPageComponent } from './requirement-detail-page.component';

describe('RequirementDetailPageComponent', () => {
  let component: RequirementDetailPageComponent;
  let fixture: ComponentFixture<RequirementDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementDetailPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
