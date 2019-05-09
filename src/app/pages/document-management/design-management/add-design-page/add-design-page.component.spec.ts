import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignPageComponent } from './add-design-page.component';

describe('AddDesignPageComponent', () => {
  let component: AddDesignPageComponent;
  let fixture: ComponentFixture<AddDesignPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesignPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
