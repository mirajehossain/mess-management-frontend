import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  public activeViewMember: any;
  public isViewMember: any = false;
  public member: object = {
    username: '',
    email: '',
    password: '',
    phone: ''
  };
  public members: any[];
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.getMembers();
  }
  goViewMember() {
    this.getMembers();
    this.isViewMember = false;
    this.activeViewMember = 'active';
  }
  goAddMember() {
    this.isViewMember = true;
  }
  addMember(member) {
    this.spinner.show();
    this.apiService.addMember(member)
      .subscribe(response => {
        this.spinner.hide();
        console.log(response);
        if (response.success) {
          this.member = null;
          this.alertService.success(response.message);
          }
        this.alertService.error(response.message);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }
  getMembers() {
   this.spinner.show();
   this.apiService.getMembers()
     .subscribe(success => {
       this.spinner.hide();
       this.members = success.data;
       console.log(success.data);
     }, error => {
       this.spinner.hide();
       console.log(error);

     });
  }
}
