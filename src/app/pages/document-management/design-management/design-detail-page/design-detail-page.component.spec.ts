import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDetailPageComponent } from './design-detail-page.component';

describe('DesignDetailPageComponent', () => {
  let component: DesignDetailPageComponent;
  let fixture: ComponentFixture<DesignDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
