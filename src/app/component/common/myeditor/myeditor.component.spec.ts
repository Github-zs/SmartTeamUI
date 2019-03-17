import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeditorComponent } from './myeditor.component';

describe('MyeditorComponent', () => {
  let component: MyeditorComponent;
  let fixture: ComponentFixture<MyeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
