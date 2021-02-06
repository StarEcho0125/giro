import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class CountryService 
{

  constructor(private httpClient: HttpClient) { }

  //Obtenim el paisos de la API del backend
  obtenirPaisos()
  {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirPaisos');
    //https://girohosting.com/index.php/api/obtenirPaisos
    //http://localhost:8000/api/obtenirPaisos
  }
}