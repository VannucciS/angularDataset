// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private resetFormSubject = new BehaviorSubject<void>(undefined);
  resetForm$ = this.resetFormSubject.asObservable();

  resetForm() {
    this.resetFormSubject.next();
  }

  private buttonVisibilitySubject = new BehaviorSubject<boolean>(false);
  buttonVisibility$ = this.buttonVisibilitySubject.asObservable();

  toggleButtonVisibility(visible: boolean) {
    this.buttonVisibilitySubject.next(visible);
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

  

  private formDataSource = new BehaviorSubject<any>(null);
  formData$ = this.formDataSource.asObservable();

  setFormData(data: any) {
    this.formDataSource.next(data);
  }

  getFormData(): any {
    return this.formDataSource.value;
  }

  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchResults(results: any[]) {
    this.searchResultsSubject.next(results);
  }

  clearSearchResults() {
    this.searchResultsSubject.next([]);
  }


}
