import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDesignPageComponent } from './edit-design-page.component';

describe('EditDesignPageComponent', () => {
  let component: EditDesignPageComponent;
  let fixture: ComponentFixture<EditDesignPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDesignPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDesignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
