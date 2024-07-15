import { Component, ViewChild } from "@angular/core";
import { SharedService } from "../shared.service";
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { DataService } from "../data.service";

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html'


})
export class NavComponent{
    

    constructor(private sharedService: SharedService, private dataService: DataService){}

    
    searchButtonClicked(){
        alert(
            'Search button clicked!'
        )
    }

    openAddModal() {
      this.sharedService.resetForm(); // This will reset the form in the modal
      this.sharedService.toggleButtonVisibility(false); // Ensure button visibility is set to false for add
    }

    isUpdate(){
        this.sharedService.toggleButtonVisibility(true)        
    }

    uploadFileClicked() {
        // Call resetUploadPreview method in FileUploadComponent
        this.sharedService.triggerResetPreview();
      }

      cleanDatabase(){
        if (confirm('Are you sure you want to clean the database?')) {
            this.dataService.cleanDatabase().subscribe(
              response => {
                alert('Database cleaned successfully!');
              },
              error => {
                console.error('Error cleaning database', error);
                alert('Failed to clean the database');
              }
            );
      }

}
}