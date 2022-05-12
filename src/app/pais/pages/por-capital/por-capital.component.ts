import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  hayError: boolean = false;
  termino: string = '';
  paises: Country[] = [];

  // Al declarar el servicio, se está inyectando
  constructor(private paisService: PaisService) {

  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino)
      .subscribe( { 
        next: (paises) => {
          this.paises = paises;
        },
        error: (e) => {
          this.hayError = true;
          this.paises = [];
      }} );

  }

}
