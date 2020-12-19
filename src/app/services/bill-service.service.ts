import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http' ;
import { Bill } from '../model/bill';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

  url =  'http://localhost:8085/bookStore/api/bill' ;

  constructor(private http: HttpClient) { }

  findBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(this.url + `/getBill/${id}`) ;
  }

  calculateTotal(id: number): Observable<number> {
    return this.http.get<number>(this.url + `/totalPrice/${id}`) ;
  }

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post(this.url + `/addBill` , bill );
  }
  findLastIdBill(): Observable<number> {
    return this.http.get<number>(this.url + `/last`) ;
  }
}
