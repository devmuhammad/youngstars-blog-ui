import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { ResultsListComponent } from './results-list/results-list.component';

import {LoadingBarModule, LoadingBarService} from "ngx-loading-bar";
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { ItemsReducer, InitialState, initialState } from './store/reducers';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ResultsListComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [NgReduxModule, LoadingBarService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<InitialState>) {
    ngRedux.configureStore(ItemsReducer, initialState);
  }
 }
