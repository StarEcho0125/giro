import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { MockArticlesComponent } from '../components/pages/blogdolibarrarticle/mock-articles/mock-articles.component'
import { param } from 'jquery';
import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class ArticleService
{

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private articlesUrl = 'api/articles';

  constructor(private httpClient: HttpClient) { }

  //Fem un post a la api per introduir un article a la BD
  //També fem un get per tal d'obtenir els articles
  publicarArticle(data)
  {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/publicarArticle', data);
  }

  editarArticle(data){
     return this.httpClient.post(GlobalConstant.apiURL + 'api/editarArticle', data);
  }

  eliminarArticle(id, language){
    return this.httpClient.delete(GlobalConstant.apiURL + 'api/eliminarArticle', {
      params: {id, language}
    });
  }

  obtenirArticles(idioma: string)
  {
     return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirArticles', {
       params: {idioma}
     });
  }

  /** GET Article from the server */
  getArticles(idioma: string): Observable<Article[]> {

    return this.httpClient.get<Article[]>(GlobalConstant.apiURL + 'api/obtenirArticles', {
      params: {idioma}
    });
  }



  getArticles_id(art_id: number | string, art_idioma: string): Observable<Article>
  {
  // https://girohosting.com/index.php/api/obtenirArticles?id=2&idioma=CAT
    const url = GlobalConstant.apiURL + 'api/obtenirArticles_ID?id=' + art_id + '&' + 'idioma=' +art_idioma;
    return this.httpClient.get<Article>(url);
  }

}
