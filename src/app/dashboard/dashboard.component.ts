import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'ngx-loading-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  allchannel: boolean = true
  searchKey: string = ''
  channelDup: any = []
  channels = [
    {title:"Dog", updates:17, type:'../assets/images/dog.jpeg', colorbg:"#BFDBFE", colortext:"#1E40AF", joined:true },
    {title:"Cat", updates:29, type:'../assets/images/cat.jpg', colorbg:"#FED7AA", colortext:"#9A3412", joined:false },
    {title:"Goat", updates:10, type:'../assets/images/goat.jpeg', colorbg:"#E9D5FF", colortext:"#6B21A8", joined: false },
    {title:"Rabbit", updates:9, type:'../assets/images/rabbit.jpeg', colorbg:"#FECDD3", colortext:"#9F1239", joined:true },
    {title:"Bird", updates:37, type:'../assets/images/bird.jpeg', colorbg:"#BBF7D0", colortext:"#166534", joined:false },
    {title:"Chicken", updates:22, type:'../assets/images/chicken.jpg', colorbg:"#BAE6FD", colortext:"#075985", joined:true },
  ]
  constructor(
    private loadingBarService: LoadingBarService
  ) { }

  ngOnInit() {
    this.channelDup = this.channels
  }


  async searchChannels(){
    this.loadingBarService.start();

    this.channels = this.channels.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1)
     
    this.loadingBarService.complete();
  }
  resetSearch(){
    this.channels = this.channelDup
  }

}
