import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  public activeViewExpense: any;
  public isViewExpense: any = false;
  public categories: any = [];
  public expenses: any = [];
  public users: any = [];
  public expense: any = {
    amount: '',
    date: '',
    categoryId: ''
  };
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
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
  goAddExpense() {
    this.isViewExpense = true;
  }
  goViewExpense() {
    this.isViewExpense = false;
    this.activeViewExpense = 'active';
  }
  addExpense() {
    this.isViewExpense = true;
  }
  getExpense() {
  }
}
