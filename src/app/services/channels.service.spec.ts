import { TestBed, fakeAsync } from '@angular/core/testing';

import { of, Observable } from 'rxjs'; 
import { ChannelsService } from './channels.service';
import {dataResult} from '../store/interface'
import { HttpClientModule } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import {LoadingBarService} from "ngx-loading-bar";
import { inject } from '@angular/core';


class MockMyService {
  public data: dataResult[];
  public getData(): Observable<dataResult[]> {
    // this.data = results;
    return of(this.data);
  }
}

describe('ChannelsService', () => {
  let imagesService: ChannelsService; 
  

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientModule], 
    providers: [ChannelsService, NgRedux, LoadingBarService,
      {
        provide: ChannelsService,
        useClass: MockMyService
      }
    ]
  })
  imagesService = TestBed.get(ChannelsService);
});

  it('should contain a search service', () => {
    const imagesService = TestBed.get(ChannelsService);
    expect(imagesService).toBeTruthy();
  });
  
    // it('should return a collection of images', fakeAsync (() => {
    //   const search ={
    //         searchKey: 'car',
    //         limit:25,
    //         offset:0
    //   }

    //   // spyOn(imagesService, 'searchChannels').and.returnValue(of(response.data));
      
    //    imagesService.searchImages(search)
    //   let response : searchResult;

    //   expect(response.data.length).toEqual(25);
    // }));
  
});
