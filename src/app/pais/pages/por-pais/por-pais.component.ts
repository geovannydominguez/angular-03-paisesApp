import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer
    }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  // Al declarar el servicio, se está inyectando
  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (paises) => {
          this.paises = paises;
        },
        error: (e) => {
          console.log('Error');
          console.info(e);
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => this.paisesSugeridos = paises.splice(0, 3),
        error: (e) => this.paisesSugeridos = []
      }
      );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }


}
