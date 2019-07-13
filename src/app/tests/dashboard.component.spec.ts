import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { PublicationService } from '../services/publication.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

class _DataTransfer {
  items: any;
  files: any;
  constructor() {
    return new ClipboardEvent("").clipboardData || new DataTransfer();
  }
}

const data = [
  new File(["a"], "a.txt")
];

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let element: HTMLElement;

  let excelSpy;
  let readerSpy;

  let publicationService: PublicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule],
      providers: [ {provide: ComponentFixtureAutoDetect, useValue: true} ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    publicationService = bannerDe.injector.get(PublicationService);

    excelSpy = spyOn(publicationService, "sendExcel").and.returnValue(of(true));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should send congress' file", () => {
    let congressInput: HTMLInputElement = element.querySelector("input[id='excelCongresos']")
    const dt = new _DataTransfer();
    for (let file of data) {
      dt.items.add(file)
    }
    if (dt.files.length) {
      congressInput.files = dt.files;
    }
    let sendCongress: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[id='sendCongress']")
    sendCongress.click()
    new FileReader().dispatchEvent(new Event("load"))
    expect(excelSpy).toHaveBeenCalled()
  });

  it("should send journey's file", () => {
    let journeyInput: HTMLInputElement = element.querySelector("input[id='excelRevistas']")
    const dt2 = new _DataTransfer();
    for (let file of data) {
      dt2.items.add(file)
    }
    if (dt2.files.length) {
      journeyInput.files = dt2.files;
    }
    let sendJourney: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[id='sendJourney']")
    sendJourney.click()
    new FileReader().dispatchEvent(new Event("load"))
    expect(excelSpy).toHaveBeenCalled()
  })
});
