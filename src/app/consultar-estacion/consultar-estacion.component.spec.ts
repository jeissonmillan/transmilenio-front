import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEstacionComponent } from './consultar-estacion.component';

describe('ConsultarEstacionComponent', () => {
  let component: ConsultarEstacionComponent;
  let fixture: ComponentFixture<ConsultarEstacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarEstacionComponent]
    });
    fixture = TestBed.createComponent(ConsultarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
