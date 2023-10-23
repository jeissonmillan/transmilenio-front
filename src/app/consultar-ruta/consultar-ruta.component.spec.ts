import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarRutaComponent } from './consultar-ruta.component';

describe('ConsultarRutaComponent', () => {
  let component: ConsultarRutaComponent;
  let fixture: ComponentFixture<ConsultarRutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarRutaComponent]
    });
    fixture = TestBed.createComponent(ConsultarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
