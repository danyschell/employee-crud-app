import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';


// export interface Employee {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   dob: Date;
//   gender: string;
//   education: string;
//   company: string;
//   experience: number;
//   package: number;
// }

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  apiUrl: string = "http://gesifar-api.test/employeeController.php";

  constructor(
    private _http: HttpClient,
  ) {}

  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeX(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.get<Employee>(url);
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> { 
    const url = `${this.apiUrl}/${id}`;
    return this._http.put(url, data);
  }

  deleteEmployee(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.delete(url);
  }
}
