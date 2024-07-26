import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { HeaderComponent } from './Header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './Modal/modal.component';
import { FooterComponent } from './Footer/footer.component';
import { SharedService } from './shared.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    HeaderComponent,
    NavComponent,
    ModalComponent,
    FooterComponent,
    FileUploadComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
