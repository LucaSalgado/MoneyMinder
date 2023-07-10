import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';
import { Observable, combineLatest } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();

  balancoMes: number = 0;
  balancoGeral: number = 0;
  PagoMes: number = 0;
  RecebidoMes: number = 0;
  nPagoMes: number = 0;
  nRecebidoMes: number = 0;

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();

    this.infoMes();
  }

  private infoMes(): void {
    combineLatest([this.pagamentos, this.recebimentos]).subscribe(
      ([pagamentos, recebimentos]) => {
        pagamentos.forEach((pag) => {
          pag.parcelas.forEach((p) => {
            if (p.pago) {
              console.log(p.valor);
              this.balancoMes -= p.valor;
              this.nPagoMes += p.valor;
  
            } else {
              this.nPagoMes += p.valor;
            }
          });
        });

        recebimentos.forEach((rec) => {
          rec.parcelas.forEach((r) => {
            if (r.pago) {
              console.log(r.valor);
              this.balancoMes += r.valor;
              this.RecebidoMes += r.valor;
            } else {
              this.nRecebidoMes += r.valor;
            }
          });
        });
      }
    );
  }
}
