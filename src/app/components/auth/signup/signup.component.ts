import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoadingBarService } from 'ngx-loading-bar';
import { AuthService } from 'src/app/services/auth.service';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from 'src/app/store/reducers';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  @Output("switchPg") switchPg: EventEmitter<any> = new EventEmitter();

  loginmsg = true
  msg = ''

  public userInfo = {
    // id: (Math.floor(Math.random() * 100)+1),
    username: '',
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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
  }

  chPg(){
    this.switchPg.emit()
  }

  async checkEmailExist(){
    await(await this.authService.emailExist(this.userInfo.email)).subscribe((res) => {
      if (res) {
        this.msg = 'Email address exists !'
        this.loadingBarService.complete()
        return this.loginmsg = false
      }else this.checkUsernameExist()
     })
  }

  async checkUsernameExist(){
    await (await this.authService.usernameExist(this.userInfo.username)).subscribe((res) => {
      if (res) {
        this.msg = 'Username is taken !'
        this.loadingBarService.complete()
        return this.loginmsg = false
      }else this.completeSignup()
     })
  }

 async completeSignup(){
    await (await this.authService.createUser(this.userInfo)).subscribe((res) => {
    // .then(async(res) => {
        if (res == 'Success'){
        this.loadingBarService.complete()
        return this.router.navigate(['/dashboard'])
        }else {
          this.msg = "Could not login, Please retry !"
        return this.loginmsg = false
        }
    })
  }

  async signUp(){
    event.preventDefault();
    this.msg = ''
    if (this.form.invalid) {
      this.msg = "**Please fill all fields"
      return this.loginmsg = false
    }

    if (this.form.get('password').value !== this.form.get('confirmPassword').value){
      this.msg = "**Password do not match"
      return this.loginmsg = false
    } 
    this.userInfo.email = this.form.get('email').value
    this.userInfo.username = this.form.get('username').value
    this.userInfo.password = this.form.get('password').value
    await this.loadingBarService.start();

    this.checkEmailExist()
    
  
  }
}
