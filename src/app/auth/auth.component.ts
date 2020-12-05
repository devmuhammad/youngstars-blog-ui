import { Component,Input, OnInit, OnChanges } from '@angular/core';

import {LoadingBarService} from "ngx-loading-bar";
import { GetItems } from '../store/actions';
import { NgRedux, select } from '@angular-redux/store';
import { InitialState } from '../store/reducers';
import { searchResult } from '../store/interface'
import { ImagesService } from '../services/images.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    name = 'Auth Component';

    login: boolean = true
    

    constructor(
        private ngRedux: NgRedux<InitialState>,
    ) {
    }
    
    @select('items') srchResults$: Observable<searchResult>
    srchResults: searchResult;

    // @Output()

    ngOnInit() {
        this.srchResults$.subscribe(srchResults => this.srchResults = srchResults)

    }
   

   
}
