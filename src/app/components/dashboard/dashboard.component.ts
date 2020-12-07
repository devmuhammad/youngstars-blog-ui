import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'ngx-loading-bar';
import { dataResult } from '../../store/interface';
import { Observable } from 'rxjs';
import { select, NgRedux } from '@angular-redux/store';
import { InitialState } from '../../store/reducers';
import { ChannelsService } from '../../services/channels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  allchannel: boolean = true
  showMsg: boolean = false
  searchKey: string = ''
  channelDup: any = []
  username: string = ''
  userDetails : any = {}
  msgDetails: any = {}

  @select('items') channels$: Observable<dataResult>
  channels: dataResult;

  constructor(
    private loadingBarService: LoadingBarService,
    private ngRedux: NgRedux<InitialState>,
    private channelsService: ChannelsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDetails()

  }

  async getAllChannels(){
    
    this.allchannel = true
    this.getDetails()
  }

  async getMyChannels(){
    await this.loadingBarService.start();
    this.allchannel = false
    await this.channelsService.getMyChannels(this.userDetails.id)
    this.channels$.subscribe(channels => {console.log(channels); this.channels = channels; this.channelDup = this.channels})
    
  }

  async getDetails(){
    await this.loadingBarService.start();
    this.userDetails = await JSON.parse(localStorage.getItem('!usrDet@'))
    this.username = this.userDetails.username

    await this.channelsService.getAllChannels()
    this.channels$.subscribe(channels => {console.log(channels); this.channels = channels; this.channelDup = this.channels})
    
  }

  async checkJoinedChannel(channelid){
    if (!this.allchannel) return;
    const details = {
      userid : this.userDetails.id,
      channelid : channelid
    }
    await(await this.channelsService.checkChannel(details)).subscribe((res) => {
      if (res) {
        this.loadingBarService.complete()
        this.showMsg = true
        this.msgDetails = {
          message: "You have joined this channel already. please try another channel!",
          type: "error"
        }
        
      }else this.joinChannel(details)
     })
  }

  async joinChannel(details){
    await (await this.channelsService.joinChannel(details)).subscribe((res) => {
      // .then(async(res) => {
          if (res == 'Success'){
          this.loadingBarService.complete()
          this.showMsg = true
          this.msgDetails = {
            message: "Welcome to a new channel, Your updates are ready !",
            type: "success"
          }
          }else {
            this.showMsg = true
            this.msgDetails = {
              message: "Unable to join channel, please retry",
              type: "error"
            }
          return ;
          }
      })
  }

  logout(){
    localStorage.removeItem('!usrDet@')
    localStorage.removeItem('reqstatus')
    this.router.navigate(['/'])
  }

  async searchChannels(){
    this.loadingBarService.start();

    this.channels = this.channelDup.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1)
     
    this.loadingBarService.complete();
  }

  resetSearch(){
    this.channels = this.channelDup
  }

}
