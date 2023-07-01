import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { MongoDBService } from 'src/app/services/mongoDB/mongo-db.service';
import { Parcela, Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(
    private fb: FormBuilder,
    private mongoDBService: MongoDBService
  ) {}

  @Input() transacao = '';

  @ViewChild('parcelasDiv')
  scrollableDiv!: ElementRef;

  registro = this.fb.group({
    apelido: [''],
    numeroParcelas: [1, [Validators.required, Validators.min(1)]],
    parcelas: this.fb.array([
      this.fb.group({
        valor: [null, Validators.required],
        dataPagamento: [null, Validators.required],
        pago: [false, Validators.required],
      })
    ]),
    nome: ['', Validators.required],
  });

  get parcelas() {
    return this.registro.get('parcelas') as FormArray;
  }

  modificarParcelas() {
    const numeroParcelas = this.registro.controls.numeroParcelas.value!;
    const parcelas = this.parcelas;

    if (parcelas.length < numeroParcelas) {
      while (parcelas.length < numeroParcelas) {
        parcelas.push(
          this.fb.group({
            valor: [null, Validators.required],
            dataPagamento: [null, Validators.required],
            pago: [false, Validators.required],
          })
        );
      }
    } else {
      while (parcelas.length > numeroParcelas) {
        parcelas.removeAt(parcelas.length - 1);
      }
    }
  }

  onSubmit() {
    if (this.transacao == 'pagar') {
      let temp: Registro = {
        apelido: this.registro.get('apelido')?.value || '',
        numeroParcelas: this.registro.get('numeroParcelas')?.value || 1,
        parcelas: (this.registro.get('parcelas')?.value || []).map((parcela: any) => ({
          valor: parcela.valor || null,
          dataPagamento: parcela.dataPagamento || null,
          pago: parcela.pago,
        })),
        nome: this.registro.get('nome')?.value || '',
      };
  
       this.mongoDBService.criaPagamento(temp).subscribe({
        complete: () => {
          this.registro.reset();
        },
      });
    } else if (this.transacao == 'receber') {
      let temp: Registro = {
        apelido: this.registro.get('apelido')?.value || '',
        numeroParcelas: this.registro.get('numeroParcelas')?.value || 1,
        parcelas: (this.registro.get('parcelas')?.value || []).map((parcela: any) => ({
          valor: parcela.valor || null,
          dataPagamento: parcela.dataPagamento || null,
          pago: parcela.pago,
        })),
        nome: this.registro.get('nome')?.value || '',
      };
  
       this.mongoDBService.criaRecebimento(temp).subscribe({
        complete: () => {
          this.registro.reset();
        },
      });
    } else {
      console.error('Não foi definido um tipo de transação');
    }
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
