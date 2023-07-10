import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import brLocale from '@fullcalendar/core/locales/pt-br';

import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';
import { Observable, combineLatest } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent {
  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();

    this.criaEventos();
  }

  private criaEventos(): void {
    // Subscreva-se aos observables de pagamentos e recebimentos para obter os dados
    combineLatest([this.pagamentos, this.recebimentos]).subscribe(
      ([pagamentos, recebimentos]) => {
        const eventos: any = [];

        // Crie os eventos para os pagamentos
        pagamentos.forEach((pagamento) => {
          pagamento.parcelas.forEach((parcela) => {
            const evento = {
              title: parcela.pago? `✔: ${pagamento.nome}` : `✖: ${pagamento.nome}`,
              start: parcela.dataPagamento, // Supondo que 'dataPagamento' seja a propriedade da data do pagamento
              color: parcela.pago? '#ff7777' : 'red', // Cor personalizada para pagamentos
            };
            eventos.push(evento);
          })
        });

        // Crie os eventos para os recebimentos
        recebimentos.forEach((recebimento) => {
          recebimento.parcelas.forEach((parcela) => {
            const evento = {
              title: parcela.pago? `✔: ${recebimento.nome}` : `✖: ${recebimento.nome}`,
              start: parcela.dataPagamento, // Supondo que 'dataPagamento' seja a propriedade da data do recebimento
              color: parcela.pago? 'lightblue' : 'blue', // Cor personalizada para recebimentos
            };
            eventos.push(evento);
          })
        });

        // Atribua os eventos à propriedade events do calendarOptions
        this.calendarOptions.events = eventos;
      }
    );
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      start: 'title',
      center: 'dayGridMonth listMonth',
      end: 'today prev next',
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, listPlugin],
    locale: brLocale,
    eventDisplay: 'list-item',
    selectable: false,
    editable: false,
    handleWindowResize: true
  };
}
