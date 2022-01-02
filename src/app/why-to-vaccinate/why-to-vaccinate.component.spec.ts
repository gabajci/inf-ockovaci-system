import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyToVaccinateComponent } from './why-to-vaccinate.component';

describe('WhyToVaccinateComponent', () => {
  let component: WhyToVaccinateComponent;
  let fixture: ComponentFixture<WhyToVaccinateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyToVaccinateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyToVaccinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
