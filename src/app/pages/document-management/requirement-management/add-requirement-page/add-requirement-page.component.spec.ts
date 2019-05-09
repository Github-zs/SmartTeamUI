import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequirementPageComponent } from './add-requirement-page.component';

describe('AddRequirementPageComponent', () => {
  let component: AddRequirementPageComponent;
  let fixture: ComponentFixture<AddRequirementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequirementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequirementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
