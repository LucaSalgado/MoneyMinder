import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(private fb: FormBuilder) {}

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
      }),
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

  onSubmit() {}

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
