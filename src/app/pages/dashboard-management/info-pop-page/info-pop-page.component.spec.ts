import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPopPageComponent } from './info-pop-page.component';

describe('InfoPopPageComponent', () => {
  let component: InfoPopPageComponent;
  let fixture: ComponentFixture<InfoPopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPopPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
