import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContriesService {

  constructor( private http: HttpClient) { }

  getContries(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(map((resp: any[]) =>
    resp.map(pais =>
      ({name: pais.name,
      code: pais.alpha3Code}
    ))
    ));
  }
}
