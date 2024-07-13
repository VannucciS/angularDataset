// file-upload.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dataset } from '../Model/dataset.model';
import { SharedService } from '../shared.service';
import { DataService } from '../data.service';

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

  constructor(private http: HttpClient, private sharedService: SharedService, private dataService: DataService) { } // Inject HttpClient for HTTP requests

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
      console.log('FileReader result:', reader.result);
      this.fullCsvContent = this.csvToArray(reader.result as string);
      this.csvContent = this.csvToArray(reader.result as string).slice(0, 100);
      console.log('CSV content:', this.csvContent);

      // Optionally, send the data to your backend API
      //this.saveToBackend(this.csvContent);
    };
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };
    reader.readAsText(this.file as Blob);
  }

  csvToArray(csvString: string): Dataset[] {
    const rows = csvString.split('\n');
    const result: Dataset[] = [];

    const headers = rows[0].split(',');
    for (let i = 1; i < rows.length; i++) {
      const currentRow = rows[i].split(',');

      if (currentRow.length === headers.length) {
        const dataset: Dataset = {
          //id: +currentRow[0].trim(),
          REF_DATE: currentRow[0].trim(),
          GEO: currentRow[1].trim(),
          DGUID: currentRow[2].trim(),
          APFVP: currentRow[3].trim(),
          UOM: currentRow[4].trim(),
          UOM_ID: +currentRow[5].trim(),
          SCALAR_FACTOR: currentRow[6].trim(),
          SCALAR_ID: +currentRow[7].trim(),
          VECTOR: currentRow[8].trim(),
          COORDINATE: +currentRow[9].trim(),
          VALUE_: +currentRow[10].trim(),
          STATUS_: currentRow[11].trim(),
          SYMBOL: currentRow[12].trim(),
          TERM: currentRow[13].trim(),
          DECIM: +currentRow[14].trim()
        };
        result.push(dataset);
      }
    }

    return result;
  }

  resetUploadPreview() {
    this.csvContent = [];
  }

  saveToBackend() {
    if (this.fullCsvContent.length > 0) {
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


