import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompleteComponent } from './acomplete.component';

describe('AcompleteComponent', () => {
  let component: AcompleteComponent;
  let fixture: ComponentFixture<AcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
