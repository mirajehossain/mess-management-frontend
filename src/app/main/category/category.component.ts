import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public activeViewCategory: any;
  public isViewCategory: any = false;
  public isEdit: any = null;
  public category: object = {
    name: '',
    isMeal: false
  };
  public categories: any[];
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.getCategory();
  }
  goViewCategory() {
    this.getCategory();
    this.isViewCategory = false;
    this.activeViewCategory = 'active';
  }
  goAddCategory() {
    this.isViewCategory = true;
  }
  addCategory(cat: object) {
    this.spinner.show();
    console.log(cat);
    this.apiService.addCategory(cat)
      .subscribe(response => {
        this.spinner.hide();
        console.log(response);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }
  getCategory() {
    this.spinner.show();
    this.apiService.getCategory()
      .subscribe(response => {
        this.spinner.hide();
        this.categories = response.data;
        console.log(response);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }
  edit(category) {
    this.isViewCategory = true;
    this.isEdit = 'Edit';
    this.category = category;
  }
  updateCategory(category) {
    this.isViewCategory = false;
    this.isEdit = null;
  }
}
