import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadingBarService } from 'ngx-loading-bar';
import { InitialState } from 'src/app/store/reducers';
import { NgRedux } from '@angular-redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { dataResult } from 'src/app/store/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @Output("switchPg") switchPg: EventEmitter<any> = new EventEmitter();

  loginmsg = true
  msg = ''
  public userInfo = {
    email: '',
    password:'',
  }

  constructor(
    private loadingBarService: LoadingBarService,
    private ngRedux: NgRedux<InitialState>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
      this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      })
  }

  ngOnInit() {
  }

  chPg(){
    this.switchPg.emit()
  }

  async signIn(){

    event.preventDefault();
    this.msg = ''
    if (this.form.invalid) {
      this.msg = "**Please fill all fields"
      return this.loginmsg = false
    }

    this.userInfo.email = this.form.get('email').value
    this.userInfo.password = this.form.get('password').value

    await this.loadingBarService.start();
    await (await this.authService.login(this.userInfo))
    .subscribe((datares: dataResult) => {
        
      if (datares[0]) {

        const {password, ...rest} = datares[0]
        const userDet = rest
        localStorage.setItem('!usrDet@', JSON.stringify(userDet))
        this.loadingBarService.complete()

        return this.router.navigate(['/dashboard'])

      }else {
        this.msg = 'Incorrect login details'
        this.loadingBarService.complete()

        return this.loginmsg = false
      }

    })
  
  }

}
