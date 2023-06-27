import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-registro-unico',
  templateUrl: './registro-unico.component.html',
  styleUrls: ['./registro-unico.component.css'],
})
export class RegistroUnicoComponent {
  /* registro: Registro = {
    apelido: null,
    valor: null,
    dataPagamento: null,
    nome: null,
    tipo: 'Pagar',
  }; */

  onSubmit() {
    console.log("teste")
  }

  registrar() {
    
  }
}
