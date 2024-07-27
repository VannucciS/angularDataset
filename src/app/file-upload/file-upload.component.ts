// file-upload.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dataset } from '../Model/dataset.model';
import { SharedService } from '../shared.service';
import { DataService } from '../data.service';
import { Papa } from 'ngx-papaparse';
import { skip } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{

  csvContent: Dataset[] = [];
  fullCsvContent: Dataset[] = [];
  file: File | null = null;
  isLoading = false;

  constructor(private http: HttpClient, private sharedService: SharedService, private dataService: DataService, private papa:Papa) { } // Inject HttpClient for HTTP requests

  ngOnInit() {
    this.sharedService.resetPreview$.subscribe(() => {
      this.resetUploadPreview();
    });
  }  

  onFileSelected(event: any) {
    this.file = event.target.files[0] as File;
    if (this.file && this.file.name.endsWith('.csv')) {
      this.readCSV();
    } else {
      console.error('Please select a CSV file.');
    }
  }

  readCSV() {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      this.papa.parse(csvData, {
        header: true,
        quoteChar: '"',
        delimiter: ',',
        skipEmptyLines: true,
        complete: (result:any) => {
         // this.fullCsvContent = result.data as Dataset[];
         // this.csvContent = result.data.slice(0, 100) as Dataset[];
         this.fullCsvContent = result.data.slice(0, 100) as Dataset[];
         this.csvContent = result.data.slice(0, 100) as Dataset[];
          // Print only the value field of the dataset
          this.csvContent.forEach((record: any) => {            
          console.log('Value:', record.APFVP);
        });
      },
      error: (error:any) => {
        console.error('PapaParse error:', error);
      }
    });  

      // Optionally, send the data to your backend API
      //this.saveToBackend(this.csvContent);
    };
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };
    reader.readAsText(this.file as Blob);
  }



  

  resetUploadPreview() {
    this.csvContent = [];
  }

  saveToBackend() {if (this.fullCsvContent.length > 0) {
    this.isLoading = true;    
    const promises = this.fullCsvContent.map((item) =>
      this.dataService.postData(item).toPromise()
    );

    Promise.all(promises)
      .then((responses) => {
        console.log('All data successfully posted', responses);
        this.fullCsvContent = []; // Clear the csvContent after successful upload
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error posting data', error);
        this.isLoading = false;
      });
  } else {
    console.error('No data to submit');
  }
  }
    
  }


