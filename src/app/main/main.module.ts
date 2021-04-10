import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MembersComponent } from './members/members.component';
import { BalanceComponent } from './balance/balance.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoryComponent } from './category/category.component';
import { SummaryComponent } from './summary/summary.component';
import {FormsModule} from '@angular/forms';
import {TokenInterceptorService} from '../service/token-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AlertModule} from '../component/alert/alert.module';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SidebarComponent,
    MembersComponent,
    BalanceComponent,
    ExpenseComponent,
    CategoryComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    AlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
    ],
  exports: [SidebarComponent]
})
export class MainModule { }
