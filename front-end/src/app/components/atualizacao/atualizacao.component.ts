import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';

import { Registro, Parcela } from 'src/app/interfaces/registro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent {

  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();
  registro: Registro | null = null;

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.mongoDBService.getPagamentos();
    this.mongoDBService.getRecebimentos();
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();
  }

  selecionarRegsitro(registro: Registro): void {
    this.registro = registro;
    console.log(typeof(this.registro), this.registro);
  }
}
