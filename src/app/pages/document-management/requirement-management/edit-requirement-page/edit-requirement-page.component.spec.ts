import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequirementPageComponent } from './edit-requirement-page.component';

describe('EditRequirementPageComponent', () => {
  let component: EditRequirementPageComponent;
  let fixture: ComponentFixture<EditRequirementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequirementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequirementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
