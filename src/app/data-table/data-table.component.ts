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
    this.loadData(); // Load data from the server

    //modification to allow data to be loaded in the modal for edition
    this.sharedService.data$.subscribe(newData => {
      this.data = newData;
    });

    this.sharedService.searchResults$.subscribe(results => {
      if (results) {
        this.data = [results]; // Set the data to the search result
      }
    });

    this.sharedService.selectedItem$.subscribe(item => {
      if (item) {
        // Logic to update the item in the table
        const index = this.data.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.data[index] = item;
        }
      }
    });
  }

  loadData(){
    this.dataService.getData().subscribe((response: any)=>{
      this.data = response.data;
      this.sharedService.setData(this.data); // Update SharedService with loaded data
    });    
  }

  populateAndUpdate(item: any) {
    this.sharedService.setSelectedItem(item);
    this.sharedService.toggleButtonVisibility(true);
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.dataService.deleteData(id).subscribe(
        response => {
          // Handle success, e.g., remove item from local data array
          this.data = this.data.filter(item => item.id !== id);
          this.sharedService.setData(this.data); // Update SharedService with updated data
          alert('Item deleted successfully!');
        },
        error => {
          console.error('Error deleting item', error);
          alert('Failed to delete item');
        }
      );
    }
  }

  
}
