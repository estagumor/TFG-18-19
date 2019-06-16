import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCreateComponent } from '../../components/person-create/person-create.component';

describe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO Fix here
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
