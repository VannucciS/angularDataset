import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private URL: string = 'http://localhost:3000/dataset';

  constructor(private http: HttpClient) { }

   // GET all data
   getData(): Observable<any[]> {
    return this.http.get<any[]>(this.URL);
  }

  // GET single data by ID
  getDataById(id: number): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.get<any>(url);
  }

  // POST new data
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.URL, data);
  }

  // PUT update data by ID
  updateData(id: number, data: any): Observable<any> {
    const url = `${this.URL}/update/${id}`;
    return this.http.put<any>(url, data);
  }

  // DELETE data by ID
  deleteData(id: number): Observable<any> {
    const url = `${this.URL}/delete/${id}`;
    return this.http.delete<any>(url);
  }

  // Clean database
  cleanDatabase(): Observable<any> {
    return this.http.post<any>(`${this.URL}/clean`, {});
  }
}
