import { Component,Input, OnInit } from '@angular/core';

import { searchResult } from '../store/interface'
@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {

  constructor() { }
  @Input() imgDetails: any;

  ngOnInit() {
  }

}
