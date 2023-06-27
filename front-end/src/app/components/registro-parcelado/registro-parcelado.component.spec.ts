import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroParceladoComponent } from './registro-parcelado.component';

describe('RegistroParceladoComponent', () => {
  let component: RegistroParceladoComponent;
  let fixture: ComponentFixture<RegistroParceladoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroParceladoComponent]
    });
    fixture = TestBed.createComponent(RegistroParceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
