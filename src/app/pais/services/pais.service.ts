import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

// providedIn: 'root' permite que los servicios estén disponibles de manera global en la aplicación
// esto evita tener que especificar en los providers de pais.module.ts
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,population,cca2,flags');
  }

  // Al declarar el módulo HttpClient, se está inyectando.
  // No importa cuantas veces llame a este Service, este constructor se crea solo una vez, 
  // como un Singleton.
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ termino }`;

    return this.http.get<Country[]>(url, {params: this.httpParams});

  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ termino }`;

    return this.http.get<Country[]>(url, {params: this.httpParams});

  }

  getPaisPorAlpha(id: string): Observable<Country[]> {
    
    const url = `${ this.apiUrl }/alpha/${ id }`;
    
    return this.http.get<Country[]>(url);
  }

  buscarRegion(region: string): Observable<Country[]> {
    
    const url = `${ this.apiUrl }/region/${ region }`;

    return this.http.get<Country[]>(url, {params: this.httpParams})
      .pipe(
        tap(console.log)
      );
  }

}

