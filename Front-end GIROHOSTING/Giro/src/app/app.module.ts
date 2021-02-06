import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthguardService } from './services/authguard.service';
import { AuthenticationService } from './services/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { ErrorComponent } from './components/pages/error/error.component';

import { IniciComponent } from "./components/pages/inici/inici.component";
import { CreemlatevawebComponent } from './components/pages/creemlatevaweb/creemlatevaweb.component';

import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeFourComponent } from './components/pages/home-four/home-four.component';
import { HomeFiveComponent } from './components/pages/home-five/home-five.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { AffiliateComponent } from './components/pages/affiliate/affiliate.component';
import { TeamComponent } from './components/pages/team/team.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { LogInComponent } from './components/pages/log-in/log-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './components/pages/recover-password/recover-password.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { NewsGridComponent } from './components/pages/news-grid/news-grid.component';
import { NewsLeftSidebarComponent } from './components/pages/news-left-sidebar/news-left-sidebar.component';
import { NewsRightSidebarComponent } from './components/pages/news-right-sidebar/news-right-sidebar.component';
import { NewsDetailsComponent } from './components/pages/news-details/news-details.component';
import { DomainComponent } from './components/pages/domain/domain.component';
import { SharedHostingComponent } from './components/pages/shared-hosting/shared-hosting.component';
import { ResellerHostingComponent } from './components/pages/reseller-hosting/reseller-hosting.component';
import { DedicatedHostingComponent } from './components/pages/dedicated-hosting/dedicated-hosting.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { AvislegalComponent } from './components/pages/avislegal/avislegal.component';
import { PoliticaprivacitatComponent } from './components/pages/politicaprivacitat/politicaprivacitat.component';
import { PoliticacookiesComponent } from './components/pages/politicacookies/politicacookies.component';
import { DolibarrComponent } from './components/pages/dolibarr/dolibarr.component';
import { MarketingdigitalComponent } from './components/pages/marketingdigital/marketingdigital.component';
import { CiberseguretatComponent } from './components/pages/ciberseguretat/ciberseguretat.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { PressupostosComponent } from './components/pages/pressupostos/pressupostos.component';
import { ContractesComponent } from './components/pages/contractes/contractes.component';
import { FacturasComponent } from './components/pages/facturas/facturas.component';
import { InicisessioComponent } from './components/pages/inicisessio/inicisessio.component';
import { RegistreComponent } from './components/pages/registre/registre.component';
import { AdminfieldComponent } from './components/pages/adminfield/adminfield.component';
import { VerSuperadminComponent } from './components/pages/ver-superadmin/ver-superadmin.component';
import { CreateOfficerComponent } from './components/pages/create-officer/create-officer.component';
import { ManageClientPasswordComponent } from './components/pages/manage-client-password/manage-client-password.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { EditOfficerComponent } from './components/pages/edit-officer/edit-officer.component';
import { WorkerComponent } from './components/pages/worker/worker.component';
import { VerOfficerComponent } from './components/pages/ver-officer/ver-officer.component';
import { VerOfficerInfoComponent } from './components/pages/ver-officer-info/ver-officer-info.component';
import { OfficeClientStatisticsComponent } from './components/pages/office-client-statistics/office-client-statistics.component';
import { OfficeClientDashboardComponent } from './components/pages/office-client-dashboard/office-client-dashboard.component';
import { OfficeGlobalDashboardComponent } from './components/pages/office-global-dashboard/office-global-dashboard.component';
import { UserpageComponent } from './components/pages/userpage/userpage.component';
import { VerClientComponent } from './components/pages/ver-client/ver-client.component';
import { ConfirmationDialogComponent } from './components/pages/confirmation-dialog/confirmation-dialog.component';
import { CreateuserComponent } from "./components/pages/user/createuser/createuser.component";
import { EdituserComponent } from "./components/pages/user/edituser/edituser.component";
import { DeleteComponent } from "./components/pages/user/delete/delete.component";
import { BlogdolibarrComponent } from './components/pages/blogdolibarr/blogdolibarr.component';
import { BlogdolibarrarticleComponent } from './components/pages/blogdolibarrarticle/blogdolibarrarticle.component';
import { PublicararticleComponent } from './components/pages/publicararticle/publicararticle.component';
import { MockArticlesComponent } from './components/pages/blogdolibarrarticle/mock-articles/mock-articles.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    FooterComponent,
    NavbarComponent,
    IniciComponent,


    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    HomeFourComponent,
    HomeFiveComponent,
    AboutComponent,
    ServicesComponent,
    AffiliateComponent,
    TeamComponent,
    FaqComponent,
    LogInComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    PricingComponent,
    NewsGridComponent,
    NewsLeftSidebarComponent,
    NewsRightSidebarComponent,
    NewsDetailsComponent,
    DomainComponent,
    SharedHostingComponent,
    ResellerHostingComponent,
    DedicatedHostingComponent,
    ComingSoonComponent,
    ErrorComponent,
    CreemlatevawebComponent,
    AvislegalComponent,
    PoliticaprivacitatComponent,
    PoliticacookiesComponent,
    DolibarrComponent,
    MarketingdigitalComponent,
    CiberseguretatComponent,
    ProfileComponent,
    PressupostosComponent,
    ContractesComponent,
    FacturasComponent,
    InicisessioComponent,
    RegistreComponent,
    AdminfieldComponent,
    VerSuperadminComponent,
    CreateOfficerComponent,
    ManageClientPasswordComponent,
    DashboardComponent,
    StatisticsComponent,
    EditOfficerComponent,
    WorkerComponent,
    VerOfficerComponent,
    VerOfficerInfoComponent,
    OfficeClientStatisticsComponent,
    OfficeClientDashboardComponent,
    OfficeGlobalDashboardComponent,
    UserpageComponent,
    VerClientComponent,
    ConfirmationDialogComponent,
    CreateuserComponent,
    EdituserComponent,
    DeleteComponent,
    BlogdolibarrComponent,
    BlogdolibarrarticleComponent,
    PublicararticleComponent,
    MockArticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    Title, Meta, AuthguardService, AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
