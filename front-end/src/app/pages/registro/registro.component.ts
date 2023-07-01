import { Component, Input, OnInit } from '@angular/core';
import { MenuVisivelService } from 'src/app/services/menuVisivel/menu-visivel.service';

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroPageComponent {
  constructor(private menuVisivelService: MenuVisivelService){}
  menuVisivel: boolean = false;
  @Input() transacao: string = "pagar"; // Valor padrão do botão de rádio selecionado

  ngOnInit(): void {
    this.menuVisivelService.menuVisivelEstado$.subscribe((estado: boolean) => {
      this.menuVisivel = estado;
    });
  }

  atualizarTransacao(valor: string) {
    this.transacao = valor;
  }

  indexBotoes() {
    return this.menuVisivel ? "botoesRadio indexBotao" : "botoesRadio";
  }
}
