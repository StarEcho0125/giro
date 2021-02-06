import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

import { IniciComponent } from "./components/pages/inici/inici.component";
import { AvislegalComponent } from "./components/pages/avislegal/avislegal.component";
import { PoliticaprivacitatComponent } from "./components/pages/politicaprivacitat/politicaprivacitat.component";
import { PoliticacookiesComponent } from "./components/pages/politicacookies/politicacookies.component";
import { CreemlatevawebComponent } from "./components/pages/creemlatevaweb/creemlatevaweb.component";
import { ContactComponent } from './components/pages/contact/contact.component';
import { DolibarrComponent } from "./components/pages/dolibarr/dolibarr.component";
import { MarketingdigitalComponent } from "./components/pages/marketingdigital/marketingdigital.component";
import { CiberseguretatComponent } from "./components/pages/ciberseguretat/ciberseguretat.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { PressupostosComponent } from "./components/pages/pressupostos/pressupostos.component";
import { FacturasComponent } from "./components/pages/facturas/facturas.component";
import { ContractesComponent } from "./components/pages/contractes/contractes.component";
import { InicisessioComponent } from "./components/pages/inicisessio/inicisessio.component";
import { RegistreComponent } from "./components/pages/registre/registre.component";
import { AdminfieldComponent } from "./components/pages/adminfield/adminfield.component";
import { VerSuperadminComponent } from "./components/pages/ver-superadmin/ver-superadmin.component";
import { CreateuserComponent } from "./components/pages/user/createuser/createuser.component";
import { EdituserComponent } from "./components/pages/user/edituser/edituser.component";
import { DeleteComponent } from "./components/pages/user/delete/delete.component";
import { CreateOfficerComponent } from "./components/pages/create-officer/create-officer.component";
import { ManageClientPasswordComponent } from "./components/pages/manage-client-password/manage-client-password.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { StatisticsComponent } from "./components/pages/statistics/statistics.component";
import { EditOfficerComponent } from "./components/pages/edit-officer/edit-officer.component";
import { WorkerComponent } from "./components/pages/worker/worker.component";
import { VerOfficerComponent } from "./components/pages/ver-officer/ver-officer.component";
import { VerOfficerInfoComponent } from "./components/pages/ver-officer-info/ver-officer-info.component";
import { OfficeClientDashboardComponent } from "./components/pages/office-client-dashboard/office-client-dashboard.component";
import { OfficeClientStatisticsComponent } from "./components/pages/office-client-statistics/office-client-statistics.component";
import { OfficeGlobalDashboardComponent } from "./components/pages/office-global-dashboard/office-global-dashboard.component";
import { UserpageComponent } from "./components/pages/userpage/userpage.component";
import { VerClientComponent } from "./components/pages/ver-client/ver-client.component";
import { PublicararticleComponent } from "./components/pages/publicararticle/publicararticle.component";
import { BlogdolibarrComponent } from "./components/pages/blogdolibarr/blogdolibarr.component";
import { BlogdolibarrarticleComponent } from "./components/pages/blogdolibarrarticle/blogdolibarrarticle.component";

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
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { NewsGridComponent } from './components/pages/news-grid/news-grid.component';
import { NewsDetailsComponent } from './components/pages/news-details/news-details.component';
import { NewsRightSidebarComponent } from './components/pages/news-right-sidebar/news-right-sidebar.component';
import { NewsLeftSidebarComponent } from './components/pages/news-left-sidebar/news-left-sidebar.component';
import { DomainComponent } from './components/pages/domain/domain.component';
import { SharedHostingComponent } from './components/pages/shared-hosting/shared-hosting.component';
import { ResellerHostingComponent } from './components/pages/reseller-hosting/reseller-hosting.component';
import { DedicatedHostingComponent } from './components/pages/dedicated-hosting/dedicated-hosting.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ErrorComponent } from './components/pages/error/error.component';

const routes: Routes = [
    {path: 'inici', component: IniciComponent},
    {path: 'avis-legal', component: AvislegalComponent},
    {path: 'crear-pagina-web', component: CreemlatevawebComponent},
    {path: 'politica-privacitat', component: PoliticaprivacitatComponent},
    {path: 'politica-cookies', component: PoliticacookiesComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'dolibarr', component: DolibarrComponent},
    {path: 'profesionales-del-marketing-digital', component: MarketingdigitalComponent},
    {path: 'ciberseguridad-informatica', component: CiberseguretatComponent},

    { path: 'area-clients', component: InicisessioComponent },
    { path: 'crear-compte', component: RegistreComponent },
    { path: 'configuracio-del-compte', component: ProfileComponent, canActivate: [AuthguardService] },
    { path: 'changepassword/:id/:role', component: ManageClientPasswordComponent},
    { path: 'edituser/:id/:role', component: EdituserComponent },

    { path: 'els-meus-pressupostos/:id', component: PressupostosComponent, canActivate: [AuthguardService]},
    { path: 'els-meus-contractes/:id', component: ContractesComponent, canActivate: [AuthguardService]},
    { path: 'els-meus-facturas/:id', component: FacturasComponent, canActivate: [AuthguardService]},

    { 
      path: 'admin-field',
      component: AdminfieldComponent, 
      children: [
        {
          path: '',
          component: VerSuperadminComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'createuser/:id', 
          component: CreateuserComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'createworker', 
          component: CreateOfficerComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'changepassword/:id/:role', 
          component: ManageClientPasswordComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'statistics/:id',
          component: StatisticsComponent,
          canActivate: [AuthguardService] 
        },
        { 
          path: 'editworker/:id/:role', 
          component: EditOfficerComponent,
          canActivate: [AuthguardService] 
        }
      ], canActivate: [AuthguardService]
    },  
    { 
      path: 'worker/:id', 
      component: WorkerComponent,
      children: [
        {
          path: '',
          component: VerOfficerComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'ver-officer-info/:officer_id/:user_id',
          component: VerOfficerInfoComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'edit-officer-info/:id/:role',
          component: EditOfficerComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'changepassword/:id/:role', 
          component: ManageClientPasswordComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'office-client-dashboard/:id',
          component: OfficeClientDashboardComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'client-statistics/:id',
          component: OfficeClientStatisticsComponent,
          canActivate: [AuthguardService]
        },
        {
          path: 'office-global-dashboard/:id',
          component: OfficeGlobalDashboardComponent,
          canActivate: [AuthguardService]
        },
      ],
      canActivate: [AuthguardService]
    },
    { 
      path: 'userpage/:id', 
      component: UserpageComponent,
      children: [
        {
          path: '',        
          component: VerClientComponent,
          canActivate: [AuthguardService]
        },
        { 
          path: 'edituser/:id/:role', 
          component: EdituserComponent ,
          canActivate: [AuthguardService]
        },
        { 
          path: 'els-user-pressupostos/:id', 
          component: PressupostosComponent, 
          canActivate: [AuthguardService]},
        { 
          path: 'els-user-contractes/:id', 
          component: ContractesComponent, 
          canActivate: [AuthguardService]},
        { 
          path: 'els-user-facturas/:id', 
          component: FacturasComponent, 
          canActivate: [AuthguardService]},
      ],
      canActivate: [AuthguardService]
    },

    { path: 'vxcbhkypwnbniuqwezmncaerdfbwtopkjjhsers', component: PublicararticleComponent},
    { path: 'blog-dolibarr', component: BlogdolibarrComponent },
    { path: 'article/:id', component: BlogdolibarrarticleComponent},


    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'home-four', component: HomeFourComponent},
    {path: 'home-five', component: HomeFiveComponent},
    {path: 'about', component: AboutComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'affiliate', component: AffiliateComponent},
    {path: 'team', component: TeamComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'log-in', component: LogInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'recover-password', component: RecoverPasswordComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'domain', component: DomainComponent},
    {path: 'shared-hosting', component: SharedHostingComponent},
    {path: 'reseller-hosting', component: ResellerHostingComponent},
    {path: 'dedicated-hosting', component: DedicatedHostingComponent},
    {path: 'news-grid', component: NewsGridComponent},
    {path: 'news-left-sidebar', component: NewsLeftSidebarComponent},
    {path: 'news-right-sidebar', component: NewsRightSidebarComponent},
    {path: 'news-details', component: NewsDetailsComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'error', component: ErrorComponent},
    // Here add new pages component

    { path: '',   redirectTo: 'inici', pathMatch: 'full'},
    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}