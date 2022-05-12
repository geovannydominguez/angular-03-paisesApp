import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent {

  // Agregar este decorador Input en el componente hijo.
  // Este Intput paises van a venir desde el componente padre.
  @Input() paises: Country[] = [];

  constructor() { }

}
