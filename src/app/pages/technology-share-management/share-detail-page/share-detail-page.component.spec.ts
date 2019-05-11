import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDetailPageComponent } from './share-detail-page.component';

describe('ShareDetailPageComponent', () => {
  let component: ShareDetailPageComponent;
  let fixture: ComponentFixture<ShareDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
