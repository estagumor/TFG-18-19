import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationStatsComponent } from '../components/publication-stats/publication-stats.component';

describe('PublicationStatsComponent', () => {
  let component: PublicationStatsComponent;
  let fixture: ComponentFixture<PublicationStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
