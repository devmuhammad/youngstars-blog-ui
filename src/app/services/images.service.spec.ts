import { TestBed, fakeAsync } from '@angular/core/testing';

import { of, Observable } from 'rxjs'; 
import { ImagesService } from './images.service';
import {searchResult} from '../store/interface'
import { HttpClientModule } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import {LoadingBarService} from "ngx-loading-bar";
import { inject } from '@angular/core';


class MockMyService {
  public data: searchResult[];
  public getData(): Observable<searchResult[]> {
    // this.data = results;
    return of(this.data);
  }
}

describe('ImagesService', () => {
  let imagesService: ImagesService; 
  

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientModule], 
    providers: [ImagesService, NgRedux, LoadingBarService,
      {
        provide: ImagesService,
        useClass: MockMyService
      }
    ]
  })
  imagesService = TestBed.get(ImagesService);
});

  it('should contain a search service', () => {
    const imagesService = TestBed.get(ImagesService);
    expect(imagesService).toBeTruthy();
  });
  
    // it('should return a collection of images', fakeAsync (() => {
    //   const search ={
    //         searchKey: 'car',
    //         limit:25,
    //         offset:0
    //   }

    //   // spyOn(imagesService, 'searchImages').and.returnValue(of(response.data));
      
    //    imagesService.searchImages(search)
    //   let response : searchResult;

    //   expect(response.data.length).toEqual(25);
    // }));
  
});
