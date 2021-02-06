import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class CallService 
{

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api
  enviarCorreuTrucar(data)
  {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/enviarCorreuTrucar', data);
    // return this.httpClient.post('/index.php/api/enviarCorreuTrucar', data);
  }
}