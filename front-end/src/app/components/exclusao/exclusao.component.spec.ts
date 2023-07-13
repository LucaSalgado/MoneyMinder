import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ExclusaoComponent } from './exclusao.component';

describe('ExclusaoComponent', () => {
  let component: ExclusaoComponent;
  let fixture: ComponentFixture<ExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExclusaoComponent],
      imports: [HttpClientModule] // Importe o HttpClientModule aqui
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
