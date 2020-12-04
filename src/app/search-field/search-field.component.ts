import { Component,Input, OnInit, OnChanges } from '@angular/core';

import {LoadingBarService} from "ngx-loading-bar";
import { GetItems } from '../store/actions';
import { NgRedux, select } from '@angular-redux/store';
import { InitialState } from '../store/reducers';
import { searchResult } from '../store/interface'
import { ImagesService } from '../services/images.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
    name = 'Search Field';

    searchKey: string = ''
    searched: boolean = false
    showResult: boolean = false
    imgDetails: any = {}
    limit: number = 25
    offset: number = 0
    currPage: number = 1

    constructor(
        private ngRedux: NgRedux<InitialState>,
        private imageService: ImagesService,
        private loadingBarService: LoadingBarService
    ) {
    }
    
    @select('items') srchResults$: Observable<searchResult>
    srchResults: searchResult;

    // @Output()

    ngOnInit() {
        this.srchResults$.subscribe(srchResults => this.srchResults = srchResults)

    }

    async searchImages(){
        this.showResult = false
        const search = {
            searchKey: this.searchKey,
            limit:this.limit,
            offset:this.offset
        }
        await this.loadingBarService.start();
        await this.imageService.searchImages(search)
        this.searched = true
    }

    goBack(){
        this.showResult = false
    }

    async nextPage(){
        this.currPage += 1

        this.offset = await this.limit*this.currPage

        const search = {
            searchKey: this.searchKey,
            limit:this.limit,
            offset:this.offset
        }
        await this.loadingBarService.start();
        await this.imageService.searchImages(search)
    }

    async backPage(){
        this.currPage -= this.currPage == 1 ? 0 : 1

        this.offset = await this.limit*this.currPage
        const search = {
            searchKey: this.searchKey,
            limit:this.limit,
            offset:this.offset
        }
        await this.loadingBarService.start();
        await this.imageService.searchImages(search)
    }

    async viewDetails(det){
        this.imgDetails = det
        this.showResult = true
    }

    research(){
        this.showResult = false
        this.searched = false
     }

    clearSearch(){
        this.searchKey = ''
        
        this.showResult = false
        this.searched = false
    }
}
