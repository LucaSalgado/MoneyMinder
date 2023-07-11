import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';
import { Observable, combineLatest } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();

  // compartilhado

  public dougChartOptions: ChartOptions = {
    responsive: false,
  };
  public dougChartLabels: string[] = ['Pago', 'Recebido'];
  public dougChartLabelsPag: string[] = ['Pago', 'Não Pago'];
  public dougChartLabelsRec: string[] = ['Recebido', 'Não Recebido'];

  // mes
  balancoMes: number = 0;
  PagoMes: number = 0;
  RecebidoMes: number = 0;
  nPagoMes: number = 0;
  nRecebidoMes: number = 0;
  
  public dougMesChartDatasetsPag: ChartDataset[] = [];
  public dougMesChartDatasetsRec: ChartDataset[] = [];
  public dougMesChartDatasets: ChartDataset[] = [];

  // geral

  balancoGeral: number = 0;
  PagoGeral: number = 0;
  RecebidoGeral: number = 0;
  nPagoGeral: number = 0;
  nRecebidoGeral: number = 0;

  public dougGeralChartDatasets: ChartDataset[] = [];
  public dougGeralChartDatasetsPag: ChartDataset[] = [];
  public dougGeralChartDatasetsRec: ChartDataset[] = [];

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();

    this.infoMes();
    this.infoGeral();
  }

  private infoMes(): void {
    combineLatest([this.pagamentos, this.recebimentos]).subscribe(
      ([pagamentos, recebimentos]) => {
        pagamentos.forEach((pag) => {
          pag.parcelas.forEach((p) => {
            if (p.pago && new Date(p.dataPagamento).getMonth() === new Date().getMonth()) {
              this.balancoMes -= p.valor;
              this.PagoMes += p.valor;
            } else {
              this.nPagoMes += p.valor;
            }
            if (p.pago) {
              this.balancoGeral -= p.valor;
              this.PagoGeral += p.valor;
            } else {
              this.nPagoGeral += p.valor;
            }
          });
        });

        recebimentos.forEach((rec) => {
          rec.parcelas.forEach((r) => {
            if (r.pago && new Date(r.dataPagamento).getMonth() === new Date().getMonth()) {
              this.balancoMes += r.valor;
              this.RecebidoMes += r.valor;
            } else {
              this.nRecebidoMes += r.valor;
            }
            if (r.pago) {
              this.balancoGeral += r.valor;
              this.RecebidoGeral += r.valor;
            } else {
              this.nRecebidoGeral += r.valor;
            }
          });
        });
        // graficos mês
        this.dougMesChartDatasets = [
          {
            data: [this.PagoMes, this.RecebidoMes],
            backgroundColor: ['rgb(255, 77, 77)', 'rgb(54, 162, 235)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
        this.dougMesChartDatasetsPag = [
          {
            data: [this.PagoMes, this.nPagoMes],
            backgroundColor: ['rgb(255, 77, 77)', 'rgb(255, 180, 180)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
        this.dougMesChartDatasetsRec = [
          {
            data: [this.RecebidoMes, this.nRecebidoMes],
            backgroundColor: ['rgb(0, 160, 255)', 'rgb(180, 180, 255)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];

        // graficos geral
        this.dougGeralChartDatasets = [
          {
            data: [this.PagoGeral, this.RecebidoGeral],
            backgroundColor: ['rgb(255, 77, 77)', 'rgb(54, 162, 235)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
        this.dougGeralChartDatasetsPag = [
          {
            data: [this.PagoGeral, this.nPagoGeral],
            backgroundColor: ['rgb(255, 77, 77)', 'rgb(255, 180, 180)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
        this.dougGeralChartDatasetsRec = [
          {
            data: [this.RecebidoGeral, this.nRecebidoGeral],
            backgroundColor: ['rgb(0, 160, 255)', 'rgb(180, 180, 255)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
      }
    );
  }
  private infoGeral(): void {
    combineLatest([this.pagamentos, this.recebimentos]).subscribe(
      ([pagamentos, recebimentos]) => {
        pagamentos.forEach((pag) => {
          pag.parcelas.forEach((p) => {
            if (p.pago) {
              this.balancoGeral -= p.valor;
              this.PagoGeral += p.valor;
            } else {
              this.nPagoGeral += p.valor;
            }
          });
        });

        recebimentos.forEach((rec) => {
          rec.parcelas.forEach((r) => {
            if (r.pago) {
              this.balancoGeral += r.valor;
              this.RecebidoGeral += r.valor;
            } else {
              this.nRecebidoGeral += r.valor;
            }
          });
        });

        this.dougGeralChartDatasets = [
          {
            data: [this.PagoGeral, this.RecebidoGeral],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            borderWidth: 1,
            label: 'Valor (R$)',
          },
        ];
      }
    );
  }
}
