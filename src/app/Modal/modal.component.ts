import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    
})
export class ModalComponent implements OnInit {
    buttonVisible:boolean = false;
    selectedItem: any;
    form: FormGroup;
    
    constructor(private fb: FormBuilder, private sharedService: SharedService) {
        this.form = this.fb.group({
            REF_DATE: [''],
            GEO: [''],
            DGUID: [''],
            APFVP: [''],
            UOM: [''],
            UOM_ID: [''],
            SCALAR_FACTOR: [''],
            SCALAR_ID: [''],
            VECTOR: [''],
            COORDINATE: [''],
            VALUE_: [''],
            STATUS_: [''],
            SYMBOL: [''],
            TERM: [''],
            DECIM: ['']
          });

    } 

    ngOnInit(): void {
        this.sharedService.selectedItem$.subscribe(item => {
          if (item) {
            this.selectedItem = item;
            this.form.patchValue(item);
            this.buttonVisible = true;  // Toggle visibility for the update button
          } else {
            this.form.reset();
            this.buttonVisible = false; // Toggle visibility for the save button
          }
        });
      }


      save(): void {
        // Handle save logic here
      }
    
      update(): void {
        // Handle update logic here
      }

}