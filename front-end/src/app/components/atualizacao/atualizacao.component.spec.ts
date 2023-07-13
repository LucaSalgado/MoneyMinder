import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AtualizacaoComponent } from './atualizacao.component';

describe('AtualizacaoComponent', () => {
  let component: AtualizacaoComponent;
  let fixture: ComponentFixture<AtualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtualizacaoComponent],
      imports: [HttpClientModule] // Importe o HttpClientModule aqui
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
