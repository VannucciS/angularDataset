import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularDataset';

   // Non-related component communication throught parent
 // Data-table -o- Modal
 isUpdate:string = "false";

 receiveUpdate(data: string){
  this.isUpdate = data;
}
}
