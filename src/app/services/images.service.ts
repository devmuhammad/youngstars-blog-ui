    import { Injectable } from '@angular/core';

    import { HttpClient } from '@angular/common/http';
    import {LoadingBarService} from "ngx-loading-bar";

    import { searchResult } from '../store/interface';

    import { NgRedux } from '@angular-redux/store';
    import { InitialState } from '../store/reducers';
    import { LoadItems } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<InitialState>,
    private loadingBarService: LoadingBarService
  ) { }

  searchImages(search) {
    const { searchKey, limit, offset} = search
    this.http
      .get('https://api.giphy.com/v1/gifs/search?api_key=deokzgUjxm6QHQdp3H3aca1LSZcCpucc&q='+searchKey+'&limit='+limit+'&offset='+offset+'&rating=Y&lang=en')
      .subscribe((searchImages: searchResult) => {
        this.ngRedux.dispatch(LoadItems(searchImages.data));
        this.loadingBarService.complete()
      });
  }
}
