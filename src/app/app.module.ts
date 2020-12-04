import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ResultsListComponent } from './results-list/results-list.component';

import {LoadingBarModule, LoadingBarService} from "ngx-loading-bar";
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { ItemsReducer, InitialState, initialState } from './store/reducers';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFieldComponent,
    ResultsListComponent,
    FooterComponent
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
