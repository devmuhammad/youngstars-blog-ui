import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const userChannel = [
    {
      userid: 2,
      channelid: 3
    },
    {
      userid: 2,
      channelid: 6
    },
    {
      userid:2,
      channelid:4
    }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user can join multiple channels'), () => {
      userChannel.forEach((element) => {
        component.joinChannel(element)
      // send post request to insert array of multiple channels for a user

      })
      //check length of array to be equal to 3
      component.channels$.subscribe(channels => {
        expect(channels.data.length).toEqual(3)
      })
      
  }
});
