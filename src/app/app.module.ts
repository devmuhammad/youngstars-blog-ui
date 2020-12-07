import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';

import {LoadingBarModule, LoadingBarService} from "ngx-loading-bar";
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { ItemsReducer, InitialState, initialState } from './store/reducers';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [NgReduxModule, LoadingBarService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<InitialState>) {
    ngRedux.configureStore(ItemsReducer, initialState);
  }
 }
