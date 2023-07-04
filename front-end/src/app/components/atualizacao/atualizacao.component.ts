import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';

import { Registro, Parcela } from 'src/app/interfaces/registro';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit{

  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();
  registro: Registro | undefined;

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

  selecionarRegistro(registro: Registro): void {
    this.registro = registro; // Importe 'of' do 'rxjs' para criar um Observable com o registro
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

}
