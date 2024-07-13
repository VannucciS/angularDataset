import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit{
  data:any[]=[];
  
  constructor(private dataService:DataService, private sharedService: SharedService){}

  ngOnInit(): void {
    this.dataService.getData().subscribe((response: any)=>{
      this.data = response.data;
    });
  }

  populateAndUpdate(){
    this.sharedService.toggleButtonVisibility(true);  

  }

  populateModal(){}

}
