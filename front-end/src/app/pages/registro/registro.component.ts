import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroPageComponent {
  transacao: string = 'pagar'; // Valor padrão do botão de rádio selecionado

  atualizarTransacao(valor: string) {
    this.transacao = valor;
  }
}
