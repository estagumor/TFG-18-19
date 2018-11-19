import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationProjectComponent } from './investigation-project.component';

describe('InvestigationProjectComponent', () => {
  let component: InvestigationProjectComponent;
  let fixture: ComponentFixture<InvestigationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
