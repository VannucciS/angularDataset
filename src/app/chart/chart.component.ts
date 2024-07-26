import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';
import { Dataset } from '../Model/dataset.model';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public data: any[] = [];
  public filteredData: any[] = [];
  public listDate: any[] = [];
  public listLocation: any[] = [];
  public listARFAFVP: any[] = [];
  

  public chart: any = [];

  constructor(private dataService: DataService) { 
    
  }


  //data from the following columns
  // REF_DATE = DATE
  // GEO = LOCATION
  // ARPAFVP = AREA, PRODUCTION AND FARM VALUE
  // UOM = UNIT OF MEASURE
  // VALUE = VALUE

  ngOnInit(): void {
    this.loadData();
    this.createChart();
    this.getTheLists();

  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });

  }

  // this function is used to get the data from the server
  loadData(){    
    this.dataService.getData().subscribe(
      (response: any)=>{      
      this.data = response.data; 
      this.filterData();    
    });          
  }

  // this function is used to get the data with the following columns  
  filterData(){
    this.filteredData = this.data.map((item: any)=>{
      return {
        date: item.REF_DATE,
        location: item.GEO,
        areaProductionFarmValue: item.APFVP,
        unitOfMeasure: item.UOM,
        value: item.VALUE_
      }
    });
    
    this.getTheLists();
  } 

  // this function is used to get the list of dates
  getTheLists(){
    this.listDate = Array.from(new Set(this.filteredData.map((item: any)=>{      
      return item.date;      
    })));
    console.log('List of Dates:', this.listDate);
    
    this.listLocation = Array.from(new Set(this.filteredData.map((item: any)=>{
      return item.location;
    })));
    this.listARFAFVP = Array.from(new Set(this.filteredData.map((item: any)=>{
      return item.areaProductionFarmValue;
    })));
  }

}
