import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';

import { Registro, Parcela } from 'src/app/interfaces/registro';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-exclusao',
  templateUrl: './exclusao.component.html',
  styleUrls: ['./exclusao.component.css'],
})
export class ExclusaoComponent {
  pagamentos: Observable<Registro[]> = new Observable();
  recebimentos: Observable<Registro[]> = new Observable();
  id: string | undefined;
  tipo: string | undefined;
  @ViewChild('modal')
  modal!: ElementRef<HTMLDialogElement>;

  constructor(private mongoDBService: MongoDBService) {}

  ngOnInit(): void {
    this.fetchRegistros();
  }

  private fetchRegistros(): void {
    this.pagamentos = this.mongoDBService.getPagamentos();
    this.recebimentos = this.mongoDBService.getRecebimentos();
  }

  selecionarRegistro(registro: Registro, tipo: string): void {
    this.id = registro._id?.toString();
    this.tipo = tipo;
    this.modal.nativeElement.showModal();
  }

  excluirRegistro() {
    if (this.tipo == "pagar") {
      this.mongoDBService.excluiPagamento(this.id!).subscribe({
        complete: () => {
          this.id = undefined;
          this.modal.nativeElement.close();
          this.fetchRegistros();
        }
      });
    } else if (this.tipo == "receber") {
      this.mongoDBService.excluiRecebimento(this.id!).subscribe({
        complete: () => {
          this.id = undefined;
          this.modal.nativeElement.close();
          this.fetchRegistros();
        }
      });
    }
  }
  
}
