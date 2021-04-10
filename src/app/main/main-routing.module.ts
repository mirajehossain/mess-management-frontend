import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {MembersComponent} from './members/members.component';
import {BalanceComponent} from './balance/balance.component';
import {ExpenseComponent} from './expense/expense.component';
import {CategoryComponent} from './category/category.component';
import {SummaryComponent} from './summary/summary.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'members', component: MembersComponent},
      { path: 'category', component: CategoryComponent},
      { path: 'balance', component: BalanceComponent},
      { path: 'expense', component: ExpenseComponent},
      { path: 'summary', component: SummaryComponent},
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
