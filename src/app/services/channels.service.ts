    import { Injectable } from '@angular/core';

    import { HttpClient } from '@angular/common/http';
    import {LoadingBarService} from "ngx-loading-bar";

    import { dataResult } from '../store/interface';

    import { NgRedux } from '@angular-redux/store';
    import { InitialState } from '../store/reducers';
    import { LoadItems } from '../store/actions';
import { DEV_BASE_URL } from './base';
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
      .get(DEV_BASE_URL+'/channels')
      .subscribe((datares: dataResult) => {
        this.ngRedux.dispatch(LoadItems(datares));
        this.loadingBarService.complete()
      });
  }

  getChannelDetail(channelid){
    return this.http
    .get(DEV_BASE_URL+'/channels?id='+channelid)
  }

  getMyChannels(userid) {
    
    this.http
      .get(DEV_BASE_URL+'/userchannels?userid='+userid)
      .subscribe((datares: [dataResult]) => {
        let myChannels = []
        let fetchCount = 0
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
    let stats = new Subject<string>();
    this.http
      .post(DEV_BASE_URL+'/userchannels',details)
      .subscribe((datares: dataResult) => {
        // this.ngRedux.dispatch(GetItems());
        
        stats.next('Success')
      });
      return stats.asObservable()
    
  }

  async checkChannel(details){
    let status = new Subject<boolean>();

    await this.http.get(DEV_BASE_URL+'/userchannels?userid='+details.userid+'&channelid='+details.channelid)
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
