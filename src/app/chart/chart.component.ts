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
  public year: string = '1908';
  public APFVP: string = 'Seeded area, potatoes';
  public dataForChart: any[] = [];
  

  public chart: any = null;

  constructor(private dataService: DataService) { 
    
  }
  //this function is used to get the year and APFVP
  onYearChange(year: string) {
    this.year = year;
    }
    
  onAPFVPChange(APFVP: string) {
    this.APFVP = APFVP;
    }

  //data from the following columns
  // REF_DATE = DATE
  // GEO = LOCATION
  // ARPAFVP = AREA, PRODUCTION AND FARM VALUE
  // UOM = UNIT OF MEASURE
  // VALUE = VALUE

  ngOnInit(): void {
    this.loadData();
    //this.createChart();
    this.getTheLists();

  }

  //this function is used to create the chart
  createChart(){
    //destroy the previous chart
    if(this.chart){
      this.chart.destroy();
    }
    
    const colors = this.dataForChart.map((item: any, index: number)=>{
      const colorArray = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'grey'];
      return colorArray[index % colorArray.length];});

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.listLocation, 
	       datasets: [
          {
            label: this.dataForChart[0].unitOfMeasure,
            data: this.dataForChart.map((item: any)=>{return item.value;}),
            backgroundColor: colors
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
        value: item.VAL
      }
    });
    this.getTheLists();
  } 

  // this function is used to get the list of dates
  getTheLists(){
    this.listDate = Array.from(new Set(this.filteredData.map((item: any)=>{return item.date;})));   
    
    this.listLocation = Array.from(new Set(this.filteredData.map((item: any)=>{return item.location;})));

    this.listARFAFVP = Array.from(new Set(this.filteredData.map((item: any)=>{return item.areaProductionFarmValue;})));
  }
  
  // this function is used to filter the data for the chart
  chartData(){
    this.dataForChart = this.filteredData.filter((item: any)=>{
      return item.date === this.year && item.areaProductionFarmValue === this.APFVP;
    });    
  }

  //this function is used to create the chart
  buttonToChart(){
    this.chartData();
    this.createChart();
  }

}
