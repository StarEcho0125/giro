import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class DepartementService 
{

  constructor(private httpClient: HttpClient) { }

  //Obtenim les provincies de la API del backend
  obtenirProvincies()
  {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirProvincies');
    // https://girohosting.com/index.php/api/obtenirProvincies
    //http://localhost:8000/api/obtenirProvincies
  }
}