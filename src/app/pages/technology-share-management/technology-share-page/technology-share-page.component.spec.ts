import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologySharePageComponent } from './technology-share-page.component';

describe('TechnologySharePageComponent', () => {
  let component: TechnologySharePageComponent;
  let fixture: ComponentFixture<TechnologySharePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologySharePageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologySharePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
