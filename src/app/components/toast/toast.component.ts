import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() msgDetails : any
  success: boolean = true
  toastmessage: string = ''
  constructor() { }

  ngOnInit() {
  }

}
