import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api per introduir un client a la BD
  enviarCorreuContacte(data)
  {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/enviarCorreuContacte', data);
    // return this.httpClient.post('/index.php/api/enviarCorreuContacte', data);
  }

  // download file
  downloadFile(file_path) {
    location.href = GlobalConstant.apiURL + 'api/downloadFile/' + file_path;
  }

  downloadSignedFile(file_path) {
    location.href = GlobalConstant.apiURL + 'api/downloadSignedFile/' + file_path;
  }
}