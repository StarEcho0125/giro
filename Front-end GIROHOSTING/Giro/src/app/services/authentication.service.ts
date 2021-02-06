import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { param } from 'jquery';

import { GlobalConstant } from "../common/global-constants";

export interface UserDetails
{
    nom: string;
    name_alias: string;
    email: string;
    phone: number;
    address: string;
    town: string;
    fk_pays: any;
    fk_departement: any;
    zip: string;
    siren: string;
    password: string;
    exp: number;
    iat: number;
    url: string;
}

interface TokenResponse
{
    token: string;
}

export interface TokenPayload
{
    id: number;
    email: string;
    password: string;
}

@Injectable()
export class AuthenticationService
{
    private token: string;
    public role: any;
    
    constructor (private http: HttpClient, private router: Router) {}

    private saveToken(token: string): void
    {
        localStorage.setItem('usertoken', token);
        this.token = token;
    }

    public getToken(): string
    {
        if(!this.token)
        {
            this.token = localStorage.getItem('usertoken');
        }

        return this.token;
    }

    public getlogo() {
        return this.http.get(GlobalConstant.apiURL + 'api/getmylogo', {
            headers: {Authorization: 'Bearer ' +  this.getToken()},
        });
    }

    public getrole(){
        return this.http.get(GlobalConstant.apiURL + 'api/getmyrole', {
            headers: {Authorization: 'Bearer ' +  this.getToken()},
        });
    }

    public getUserDetails(): UserDetails
    {
        const token = this.getToken();
        let payload;
        if(token)
        {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else
        {
            return null;
        }
    }

    public isLoggedIn(): boolean
    {
        const user = this.getUserDetails();

        if(user)
        {
            return user.exp > Date.now() / 1000;
        }
        else
        {
            return false;
        }
    }

    public register(user, role): Observable<any>
    {
      
        return this.http.post(GlobalConstant.apiURL + 'api/enregistrarClient', {
            user: user,
            role: role,
        }/*, {
            
            headers: {Authorization: 'Bearer ' +  this.getToken()}
        }*/)
    }

    public update(user, id): Observable<any>
    {
        
        user.id = id;

        return this.http.post(GlobalConstant.apiURL + 'api/updateClient', user, {
            
            headers: {Authorization: 'Bearer ' +  this.getToken()}
        })
        // return this.http.post('http://localhost:8000/api/enregistrarClient', user)
    }

    public login(user: TokenPayload): Observable<any>
    {
        const base = this.http.post(GlobalConstant.apiURL + 'api/login', 
        {email: user.email, password: user.password});

        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token)
                {
                    this.saveToken(data.token)
                }

                return data;
            })
        )

        //http://localhost:8000/api/login
        //https://girohosting.com/index.php/api/login

        return request;
    }

    public profile(): Observable<any>
    {
        //return this.http.get('https://girohosting.com/index.php/api/me', {
        //    headers: {Authorization: 'Bearer ' +  this.getToken()}
        //});

        return this.http.get(GlobalConstant.apiURL + 'api/me', {
            headers: {Authorization: 'Bearer ' +  this.getToken()}
        });
    }

    public logout(): void
    {
        this.token = '';
        window.localStorage.removeItem('usertoken');
        this.router.navigateByUrl('/');
    }

    public canviar_Password(cliente)
    {
        /*
        return this.http.post('http://localhost:8000/index.php/api/canviarPassword', cliente ,{
            headers: {Authorization: 'Bearer ' +  this.getToken()}
        });
        */
       return this.http.post(GlobalConstant.apiURL + 'api/canviarPassword', cliente, {
           headers:
           {
               "Content-Type":  "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "POST",
               Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }

    public getadminid() {
        return this.http.post(GlobalConstant.apiURL + 'api/getadminid', {}, {
            headers:
            {
               "Content-Type":  "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "POST",
               Authorization: 'Bearer ' +  this.getToken()
            }
        })
    }

    public changepassword(id, role, password) {
        return this.http.post(GlobalConstant.apiURL + 'api/changepassword',{
            id,
            role,
            password
        }, {
            headers: {
                "Content-Type":  "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }

    public create_worker(worker) {
        return this.http.post(GlobalConstant.apiURL + 'api/createWorker', worker, {
            headers: {
               Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }

    public get_worker(rowid) {
        return this.http.post(GlobalConstant.apiURL + 'api/getWorker', {rowid}, {
            headers: {
                Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }

    public edit_worker(rowid, worker) {
        return this.http.post(GlobalConstant.apiURL + 'api/editWorker', {
            rowid, worker
        }, {
            headers: {
                Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }

    public getadminuserid(rowid) {
        return this.http.post(GlobalConstant.apiURL + 'api/getadminuserid', {
            rowid
        }, {
            headers: {
                Authorization: 'Bearer ' +  this.getToken()
            }
        });
    }
}