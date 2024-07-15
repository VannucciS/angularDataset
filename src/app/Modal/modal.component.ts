import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    
})
export class ModalComponent implements OnInit {
    buttonVisible:boolean = false;
    selectedItem: any;
    form!: FormGroup;
    
    constructor(private fb: FormBuilder, private sharedService: SharedService, private dataService: DataService) {
        

    } 

    ngOnInit(): void {

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
          this.sharedService.resetForm$.subscribe(() => {
            this.form.reset();
          });
      
          this.sharedService.buttonVisibility$.subscribe(isUpdate => {
            this.buttonVisible = isUpdate;
          });

          this.sharedService.formData$.subscribe(data => {
            if (data) {
              this.form.patchValue(data);
            }
          });

          this.sharedService.selectedItem$.subscribe(data => {
            if (data) {
              this.form.patchValue(data); // Update form with selected item data
            } else {
              this.form.reset(); // Clear form if no item selected
            }
          });
      }

      onSave() {
        const formData = this.form.value;
        // Implement logic to save updated data to your persistence layer via data service
        // Example: this.dataService.updateData(formData).subscribe(...)
        // After saving, reset form and notify success/failure
        this.form.reset();
        alert('Data updated successfully!');
      }


      saveData() {
        if (this.form.valid) {
          this.dataService.postData(this.form.value).subscribe(
            response => {
              alert('Data saved successfully');
              this.form.reset();
              this.sharedService.resetForm(); // Reset form data in shared service
            },
            error => {
              console.error('Error saving data', error);
              alert('Failed to save data');
            }
          );
        }
      }
    
      updateData(): void {
        // Handle update logic here
      }

}