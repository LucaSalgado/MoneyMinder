import { Component } from '@angular/core';

import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-registro-parcelado',
  templateUrl: './registro-parcelado.component.html',
  styleUrls: ['./registro-parcelado.component.css']
})
export class RegistroParceladoComponent {
  

  onSubmit() {
    console.log("teste")
  }

  registrar() {
    
  }
}
