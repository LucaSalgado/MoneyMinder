import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';

import { Registro, Parcela } from 'src/app/interfaces/registro';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css'],
})
export class AtualizacaoComponent implements OnInit {
  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();
  registro: Registro | undefined;
  tipo: string | undefined;

  @ViewChild('parcelasDiv')
  scrollableDiv!: ElementRef;

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();
  }

  selecionarRegistro(registro: Registro, tipo: string): void {
    this.registro = { ...registro };
    this.tipo = tipo;
  }  

  proximo() {
    const divElement: HTMLDivElement = this.scrollableDiv.nativeElement;
    setTimeout(() => {
      divElement.scrollLeft += divElement.offsetWidth;
    }, 150);
  }

  anterior() {
    const divElement: HTMLDivElement = this.scrollableDiv.nativeElement;
    setTimeout(() => {
      divElement.scrollLeft -= divElement.offsetWidth;
    }, 150);
  }

  atualizarDataParcela(parcela: Parcela, event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    parcela.dataPagamento = new Date(inputValue);
  }

  modificarParcelas(parcelas: Parcela[], numeroParcelas: number) {
    if (parcelas.length < numeroParcelas) {
      while (parcelas.length < numeroParcelas) {
        parcelas.push({ valor: 0, dataPagamento: new Date(), pago: false });
      }
    } else {
      while (parcelas.length > numeroParcelas) {
        parcelas.pop();
      }
    }
  }

  atualizar() {
    if (this.tipo == 'pagar') {
      this.mongoDBService.atualizaPagamento(this.registro!).subscribe({
        complete: () => {
          this.registro = undefined;
          this.fetchRegistros();
        },
      });
    } else if (this.tipo == 'receber') {
      this.mongoDBService.atualizaRecebimento(this.registro!).subscribe({
        complete: () => {
          this.registro = undefined;
          this.fetchRegistros();
        },
      });
    }
  }
}
