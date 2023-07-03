import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registro-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class RegistroSidebarComponent {
  @Output() operacao: EventEmitter<string> = new EventEmitter<string>(); // Valor padrão do botão de rádio selecionado

  atualizarOperacao(valor: string) {
    this.operacao.emit(valor);
  }
}