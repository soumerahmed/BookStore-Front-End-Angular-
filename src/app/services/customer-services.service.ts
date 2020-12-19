import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServicesService {

  url =  'http://localhost:8085/bookStore/api/customer' ;

  constructor(private http: HttpClient) { }

  findCustomerById(id: number): Customer {
    return this.http.get<Customer>(this.url + `/getCustomer/${id}`) as Customer ;
  }
  findBCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.url + `/getCustomer/${id}`) ;
    }

  addCustomer(customer: Customer): Observable<Customer> {
   return this.http.post(this.url + `/addCustomer` , customer);
  }
  findLastIdCustomer(): Observable<number> {
    return this.http.get<number>(this.url + `/last`) ;
  }
}
