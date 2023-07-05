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

  private fetchPagamentos() {
    // Pega todos os pagamentos do banco
    this.httpClient
      .get<Registro[]>(`${this.url}/pagamentos`)
      .subscribe((pagamentos) => {
        this.pagamentos$.next(pagamentos);
      });
  }

  private fetchRecebimentos() {
    // Pega todos os recebimentos do banco
    this.httpClient
      .get<Registro[]>(`${this.url}/recebimentos`)
      .subscribe((recebimentos) => {
        this.recebimentos$.next(recebimentos);
      });
  }

  private fetchRegistros() {
    // Pega todos os registros do banco
    this.httpClient
      .get<Registro[]>(`${this.url}/`)
      .subscribe((registros) => {
        this.registros$.next(registros);
      });
  }

  getRegistros() {
    this.fetchRegistros();
    return this.registros$;
  }

  getPagamentos() {
    this.fetchPagamentos();
    return this.pagamentos$;
  }

  getRecebimentos() {
    this.fetchRecebimentos();
    return this.recebimentos$;
  }

  criaPagamento(pagamento: Registro): Observable<string> {
    // Registra no Banco um Pagamento
    return this.httpClient.post(`${this.url}/pagamentos`, pagamento, { responseType: 'text'});
  }

  criaRecebimento(recebimento: Registro): Observable<string> {
    // Registra no Banco um Recebimento
    return this.httpClient.post(`${this.url}/recebimentos`, recebimento, { responseType: 'text'});
  }

  atualizaPagamento(registro: Registro): Observable<string> {
    return this.httpClient.put(`${this.url}/pagamentos`, registro, { responseType: 'text' });
  }

  atualizaRecebimento(registro: Registro): Observable<string> {
    return this.httpClient.put(`${this.url}/recebimentos`, registro, { responseType: 'text' });
  }

  excluiPagamento(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/pagamentos/${id}`, { responseType: 'text' });
  }
  
  excluiRecebimento(id: string): Observable<string> {
  
    return this.httpClient.delete(`${this.url}/recebimentos/${id}`, { responseType: 'text' });
  }
  
}
