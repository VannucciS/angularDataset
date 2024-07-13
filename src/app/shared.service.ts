// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private buttonVisibilitySource = new BehaviorSubject<boolean>(false);
  currentVisibility = this.buttonVisibilitySource.asObservable();

  toggleButtonVisibility(visible: boolean) {
    this.buttonVisibilitySource.next(visible);
  }

  private resetPreviewSubject = new BehaviorSubject<boolean>(false);
  resetPreview$ = this.resetPreviewSubject.asObservable();

  triggerResetPreview() {
    this.resetPreviewSubject.next(true);
  }

  //feature to load data to the modal component for edition
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  private selectedItemSubject = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  setData(data: any[]) {
    this.dataSubject.next(data);
  }

  setSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }

}
