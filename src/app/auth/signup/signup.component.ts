import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {SignupInterface} from './signup-interface';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: SignupInterface = new SignupInterface();
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  signUp(user) {
    this.spinner.show();
    this.apiService.signup(user)
      .subscribe(response => {
        this.spinner.hide();
        console.log(response);
        if (response.success) {
          this.router.navigate(['/auth/login']);
        } else {
          this.alertService.error(response.message);
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

}
