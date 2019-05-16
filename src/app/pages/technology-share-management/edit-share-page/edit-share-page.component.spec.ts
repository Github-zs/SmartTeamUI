import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSharePageComponent } from './edit-share-page.component';

describe('EditSharePageComponent', () => {
  let component: EditSharePageComponent;
  let fixture: ComponentFixture<EditSharePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSharePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSharePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
