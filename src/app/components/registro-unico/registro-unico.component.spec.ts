import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUnicoComponent } from './registro-unico.component';

describe('RegistroUnicoComponent', () => {
  let component: RegistroUnicoComponent;
  let fixture: ComponentFixture<RegistroUnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroUnicoComponent]
    });
    fixture = TestBed.createComponent(RegistroUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
