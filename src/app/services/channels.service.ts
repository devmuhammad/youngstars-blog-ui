    import { Injectable } from '@angular/core';

    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import {LoadingBarService} from "ngx-loading-bar";

    import { dataResult } from '../store/interface';

    import { NgRedux } from '@angular-redux/store';
    import { InitialState } from '../store/reducers';
    import { LoadItems } from '../store/actions';
import { PROD_BASE_URL } from './base';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<InitialState>,
    private loadingBarService: LoadingBarService
  ) { }

  getAllChannels() {
   
    this.http
      .get(PROD_BASE_URL+'/channels')
      .subscribe((datares: dataResult) => {
        this.ngRedux.dispatch(LoadItems(datares));
        this.loadingBarService.complete()
      });
  }

  getChannelDetail(channelid){
    return this.http
    .get(PROD_BASE_URL+'/channels?id='+channelid)
  }

  getMyChannels(userid) {
    
    this.http
      .get(PROD_BASE_URL+'/userchannels?userid='+userid)
      .subscribe((datares: [dataResult]) => {
        console.log(datares)
        let myChannels = []
        let fetchCount = 0
        let dg = 0
       
        if (datares.length ==  dg) {
          this.loadingBarService.complete()
          return this.ngRedux.dispatch(LoadItems([]));
        }

        datares.forEach((element : any,) => {

          this.getChannelDetail(element.channelid)
          .subscribe(async(channel) => {
            fetchCount++
            myChannels.push(channel[0])
            if (fetchCount == datares.length){
              this.ngRedux.dispatch(LoadItems(myChannels));
            }
          })
        });
         

        this.loadingBarService.complete()
      });
  }
  
  joinChannel(details){
    const headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json',)
  .set('Access-Control-Allow-Origin', '*');

    let stats = new Subject<string>();
    this.http
      .post(PROD_BASE_URL+'/userchannels',details,{headers: headers})
      .subscribe((datares: dataResult) => {
        // this.ngRedux.dispatch(GetItems());
        
        stats.next('Success')
      });
      return stats.asObservable()
    
  }

  async checkChannel(details){
    let status = new Subject<boolean>();

    await this.http.get(PROD_BASE_URL+'/userchannels?userid='+details.userid+'&channelid='+details.channelid)
    .subscribe((datares: dataResult) => {
      // this.ngRedux.dispatch(LoadItems(datares));
      if (datares[0]) {
        
        status.next(true)
      }else {
        status.next(false)
      } 
    });
    
    return status.asObservable();
  }
}
