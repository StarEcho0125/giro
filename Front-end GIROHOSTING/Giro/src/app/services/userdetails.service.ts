import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import { GlobalConstant } from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService 
{

  activeLink: string = 'USER_PAGE.BUTTON.EDITAR_CLIENTE';
  activeSuperadminLink: string = 'ADMIN_FIELD.NAVBAR.SUPERADMIN_PAGE';
  activeOfficerLink: string = 'ADMIN_FIELD.NAVBAR.OFFICER_PAGE';

  constructor(private httpClient: HttpClient, public auth: AuthenticationService) { }

  obtenirDadesUsuari(rowid)
  {
    /*
    return this.httpClient.get('https://girohosting.com/index.php/api/userDetails', {
        headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        params: {email}
      });
*/
      return this.httpClient.get(GlobalConstant.apiURL + 'api/userDetails', {
         headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
         params: {rowid}
       });
    // https://girohosting.com/index.php/api/userDetails
    //http://localhost:8000/api/userDetails
  }

  updateProfile(client)
  {
      return this.httpClient.post(GlobalConstant.apiURL + 'api/updateProfile', client,
      {headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        // params: {client}}
        //https://girohosting.com/index.php/api/updateProfile
        //http://localhost:8000/api/updateProfile
  });    
  }

  obtenirPressupostosUsuari(id)
  {
    
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirPressupostos', {
        headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        params: {id}
      });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }
  
  obtenirPressupostosSignads(id)
  {
    
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirPressupostosSignads', {
        headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        params: {id}
      });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }

  budgetUpdate(formData)
  {
      return this.httpClient.post(GlobalConstant.apiURL + 'api/budgetUpload', formData,
      {headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        // params: {client}}
        //https://girohosting.com/index.php/api/budgetUpload
        //http://localhost:8000/index.php/api/budgetUpload
  });    
  }

  contractUpdate(formData)
  {
      return this.httpClient.post(GlobalConstant.apiURL + 'api/contractUpload', formData,
      {
        headers: {Authorization: 'Bearer ' +  this.auth.getToken(),
      },
        // params: {client}}
        //https://girohosting.com/index.php/api/contractUpload
        //http://localhost:8000/api/contractUpload
  });    
  }

  obtenirFacturasUsuari(id)
{
  return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirFacturas', {
      headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
      params: {id}
    });

}
  obtenirContratosUsuari(id)
  {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirContratos', {
        headers: {Authorization: 'Bearer ' +  this.auth.getToken()},
        params: {id}
      });

  }

  budgetUpload(formData)
  {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/obtenirContratos', {
        headers: {Authorization: 'Bearer  ' +  this.auth.getToken()
      },
        params: {formData}
      });
  }

  ////////////////////////////////////////////////// Chico ingles ///////////////////////////////////////////////////////////////////////////////

  downloadfile() {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/download',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      });
  }

  getlogo(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getlogo',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
        params: {id},
      });
  }

  client() {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getclient',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      });
  }

  getmycustomer(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getmycustomer',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
        params: { id },
      });
  }

  worker() {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getworker',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      });
  }

  getprofile(id, role) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getprofile',
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() },
        params: { id, role },
      });
  }

  getrole(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getrole',
      {
        headers: { Authorization: 'Bearer  ' + this.auth.getToken() },
        params: { id },
      });
  }

  logoUpload(formData) {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/logoUpload', formData,
      {
        headers: { Authorization: 'Bearer ' + this.auth.getToken() }
      });
  }

  getbudget(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/getbudget', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }

  getinvoice(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirFacturas', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }
  getcontract(id) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/obtenirContratos', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      params: { id }
    });
    // https://girohosting.com/index.php/api/obtenirPressupostos
    //http://localhost:8000/api/obtenirPressupostos
  }

  delete(id, role) {
    return this.httpClient.get(GlobalConstant.apiURL + 'api/delete', {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() },
      params: { id, role }
    });
  }

  getdashboard(id) {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/obtenirDashboard', {
      id
    }, {
      headers: {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    });
  }

  getofficerclientdashboard(id) {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/obtenirOfficerClientDashboard', {
      id
    }, {
      headers: {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    });
  }

  getofficerglobaldashboard(id) {
    return this.httpClient.post(GlobalConstant.apiURL + 'api/obtenirOfficerGlobalDashboard', {
      id
    }, {
      headers: {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    });
  }
}