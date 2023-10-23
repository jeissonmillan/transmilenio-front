import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarZonaComponent } from './consultar-zona.component';

describe('ConsultarZonaComponent', () => {
  let component: ConsultarZonaComponent;
  let fixture: ComponentFixture<ConsultarZonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarZonaComponent]
    });
    fixture = TestBed.createComponent(ConsultarZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
