import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DisplayComponent } from '../components/display/display.component';
import { By } from '@angular/platform-browser';

xdescribe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
      imports: [HttpClientModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;

    // find the hero's DebugElement and element
    let titleDe = fixture.debugElement.query(By.css('.modal-title.text-muted'));
    let restDe = fixture.debugElement.query(By.css('.modal-body'));
    
    let titleEl = titleDe.nativeElement;
    let restEl = restDe.nativeElement;
    // mock the hero supplied by the parent component
    let expectedObj = { title: 'Prueba', array: ['Pepe','Julia','Ana'] };
    // simulate the parent setting the input property with that hero
    component.objeto = expectedObj;


    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display our object correctly', () => {
    // const expectedPipedName = expectedHero.name.toUpperCase();
    // expect(heroEl.textContent).toContain(expectedPipedName);
  });

});
