import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSharePageComponent } from './add-share-page.component';

describe('AddSharePageComponent', () => {
  let component: AddSharePageComponent;
  let fixture: ComponentFixture<AddSharePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSharePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSharePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
