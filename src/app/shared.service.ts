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

}
