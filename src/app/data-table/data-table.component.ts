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

    //modification to allow data to be loaded in the modal for edition
    this.sharedService.data$.subscribe(newData => {
      this.data = newData;
    });
  }

  populateAndUpdate(item: any) {
    this.sharedService.setSelectedItem(item);
    this.sharedService.toggleButtonVisibility(true);
  }

  
}
