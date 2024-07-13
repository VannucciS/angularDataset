import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    
})
export class ModalComponent implements OnInit {
    buttonVisible:boolean = false;
    
    constructor(private sharedService: SharedService) {} 

    ngOnInit(){
        this.sharedService.currentVisibility.subscribe(visible => {
            this.buttonVisible = visible;
        });
    }


    editData!:{
        id: number;
        REF_DATE: string;
        GEO: string;
        DGUID: string;
        APFVP: string;
        UOM: string;
        UOM_ID: number;
        SCALAR_FACTOR: string;
        SCALAR_ID: number;
        VECTOR: string;
        COORDINATE: number;
        VALUE_: number;
        STATUS_: string;
        SYMBOL: string;
        TERM: string;
        DECIM: number;
    } 

}