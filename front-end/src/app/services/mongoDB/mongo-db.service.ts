import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { Registro } from 'src/app/interfaces/registro';

@Injectable({
  providedIn: 'root',
})
export class MongoDBService {
  private url = 'http://localhost:5200';
  private registros$: Subject<Registro[]> = new Subject();
  private pagamentos$: Subject<Registro[]> = new Subject();
  private recebimentos$: Subject<Registro[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  getRegistros() {
    // Pega todos os registros do banco
    this.httpClient.get<Registro[]>(`${this.url}/`).subscribe((registros) => {
      this.registros$.next(registros);
    });
  }

  private atualizaPagamentos() {
    // Pega todos os pagamentos do banco
    this.httpClient
      .get<Registro[]>(`${this.url}/pagamentos`)
      .subscribe((pagamentos) => {
        this.pagamentos$.next(pagamentos);
      });
  }

  private atualizaRecebimentos() {
    // Pega todos os recebimentos do banco
    this.httpClient
      .get<Registro[]>(`${this.url}/recebimentos`)
      .subscribe((recebimentos) => {
        this.recebimentos$.next(recebimentos);
      });
  }

  criaPagamento(pagamento: Registro): Observable<string> {
    // Registra no Banco um Pagamento
    return this.httpClient.post(`${this.url}/pagamentos`, pagamento, { responseType: 'text'});
  }

  criaRecebimento(recebimento: Registro): Observable<string> {
    // Registra no Banco um Recebimento
    return this.httpClient.post(`${this.url}/recebimentos`, recebimento, { responseType: 'text'});
  }
}
