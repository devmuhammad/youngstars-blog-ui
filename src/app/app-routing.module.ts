import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFieldComponent } from './search-field/search-field.component'

// const routes: Routes = [];
 const routes: Routes = [
  {
    path: '',  component: SearchFieldComponent
    
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
