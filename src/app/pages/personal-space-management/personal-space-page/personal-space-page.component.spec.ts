import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSpacePageComponent } from './personal-space-page.component';

describe('PersonalSpacePageComponent', () => {
  let component: PersonalSpacePageComponent;
  let fixture: ComponentFixture<PersonalSpacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSpacePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSpacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
