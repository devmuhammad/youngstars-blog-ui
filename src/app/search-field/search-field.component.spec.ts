import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';

import { SearchFieldComponent } from './search-field.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component'
import { ResultsListComponent } from '../results-list/results-list.component'
import { NgRedux, select } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarService } from 'ngx-loading-bar';
import { ImagesService } from '../services/images.service';
import { of, Observable } from 'rxjs';
import { searchResult } from '../store/interface'



describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientModule], 
      providers:[NgRedux, LoadingBarService,
      ],
      declarations: [ SearchFieldComponent, FooterComponent, ResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    
    component.ngOnInit = () => {} 
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Search Field Test: should correctly render the entered value ', fakeAsync(() => {

    component.searchKey = 'test input'
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      
      expect(component.searchKey).toEqual('test input');
    })
  }));
});
