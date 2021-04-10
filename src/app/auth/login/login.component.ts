import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = {
    email: '',
    password: ''
  };
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit(): void {
  }
  public login(obj): void{
    console.log(this.user);
    this.spinner.show();
    this.apiService.login(obj).subscribe(response => {
      this.spinner.hide();
      console.log(response);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/home']);
      } else {
        this.alertService.error(response.message);
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  success(message: string): void {
    this.alertService.success(message);
  }

  error(message: string): void {
    this.alertService.error(message);
  }

  info(message: string): void {
    this.alertService.info(message);
  }

  warn(message: string): void {
    this.alertService.warn(message);
  }

  clear(): void {
    this.alertService.clear();
  }
}
