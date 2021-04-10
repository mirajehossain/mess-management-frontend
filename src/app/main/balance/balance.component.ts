import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  public activeViewBalance: any;
  public isViewBalance: any = false;
  public categories: any = [];
  public balances: any = [];
  public users: any = [];
  public balance: any = {
    amount: '',
    date: '',
    categoryId: ''
  };
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getBalances();
    this.apiService.getCategory().subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
    }, error => {
      // TODO
    });
    this.apiService.getMembers().subscribe(response => {
      this.users = response.data;
    }, error => {
      // TODO
    });
  }
  goViewBalance() {
    this.getBalances();
    this.isViewBalance = false;
    this.activeViewBalance = 'active';
  }
  goAddBalance() {
    this.isViewBalance = true;
  }
  addBalance(balance: any) {
    console.log(balance);
    this.apiService.addBalance(balance)
      .subscribe(response => {
        console.log(response);
      }, error => {

      });
  }
  getBalances() {
    this.apiService.getBalance()
      .subscribe(response => {
        console.log(response.data);
        this.balances = response.data;
      }, error => {

      });
  }
}
