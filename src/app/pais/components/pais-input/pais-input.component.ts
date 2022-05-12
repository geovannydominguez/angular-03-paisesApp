import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {  

  // Emitir el evento al componente padre. Especificar el tipo
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // Voy a recibir desde el componente padre, algo llamado placeholder
  @Input() placeholder: string = '';

  // Debounce Timne:
  // it's like the time after clicking that the mouse won't allow another click to register

  // Se crea un Observable de forma manual
  debouncer: Subject<string> = new Subject();

  // esta variable está asociada al objeto input del HTML
  termino: string = '';

  // se dispara una unica vez cuando el compomente se ha creado e inicializado
  ngOnInit(): void {

    this.debouncer
      .pipe(debounceTime(300)) //No emitas el subscribe hasta que el Observable deje de emitir valores después de 300 ms.
      .subscribe({
        next: (valor) => {
        this.onDebounce.emit( valor );        
        // también es posible enviar this.termino, pero con el Observable ya tengo el valor.
      }});
    
  }

  buscar() {
    this.onEnter.emit(this.termino);

  }

  teclaPresionada() {
    // El next llama al debouncer que ya está suscrito en el ngOnInit().
    this.debouncer.next(this.termino);
  }

  
}
