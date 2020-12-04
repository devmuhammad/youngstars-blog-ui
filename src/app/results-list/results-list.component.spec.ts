import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsListComponent } from './results-list.component';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingBarService } from 'ngx-loading-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

describe('ResultsListComponent', () => {
  let component: ResultsListComponent;
  let fixture: ComponentFixture<ResultsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientModule], 
      providers:[NgRedux, LoadingBarService,
      ],
      declarations: [SearchFieldComponent,FooterComponent, ResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent);
    component = fixture.componentInstance;
    component.imgDetails = {
      title: 'cargif',
      username: 'usrr',
      slug: 'hsggahhd',
      type: 'gif',
      rating: 'pg',
      import_datetime: '2020-01-23',
      images: {
        downsized_large: {
          url: 'cargif.gif'
        }
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should populate Image Details & result list', () => {
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.imgDetails).toEqual({
        title: 'cargif',
      username: 'usrr',
      slug: 'hsggahhd',
      type: 'gif',
      rating: 'pg',
      import_datetime: '2020-01-23',
      images: {
        downsized_large: {
          url: 'cargif.gif'
        }
      }
      })
    })
    
  })


});
