import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // Con ! le digo a TypeScript que pais puede ser null y que confie en mi.
  // Que trate a esta variable como si tuviera datos pero puede ser null.
  pais!: Country;

  // inyectar ActivatedRoute y PaisService
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService) { }

  ngOnInit(): void {
    // Para observar los cambios de la URL.
    // Params genera un Observable.
    // El nombre de estos params se los puede ver en app-routing.module.ts
    // Usando Desestructuracion de Objetos. params['id'] obtengo el id
    this.activatedRoute.params
      .pipe(
        // Dentro el pipe se pueden utilizar operadores de rxjs.
        // El switchMap hace un cambio, recibe el valor del 1er Observable y retorna un nuevo Observable
        // Esto reemplaza el codigo comentado de la parte de abajo, es decir, evita tener que suscribirse a un
        // observable dentro de otro observable
        switchMap( ({id}) => this.paisService.getPaisPorAlpha(id) ),

        // El tap recibe el resultado del Obervable e imprime en pantalla
        tap(console.log)
      )
      .subscribe( pais => this.pais = pais[0]);

      

    // this.activatedRoute.params
    //   .subscribe( // me suscribo al Observable params
    //     // Usando Desestructuracion de Objetos. params['id']
    //     ( {id} ) => {
    //       //console.log(id);

    //       this.paisService.getPaisPorAlpha(id)
    //         .subscribe(
    //           (pais) => {
    //             console.log(pais[0]);
    //             this.pais = pais[0];
    //           }
    //         );

    //     }
    //   );


  }

}
