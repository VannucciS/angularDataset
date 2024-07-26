import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  {path: 'chart', component: ChartComponent},
  {path: 'data-table', component: DataTableComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
