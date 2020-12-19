import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

  url =  'http://localhost:8085/bookStore/api/book' ;

  constructor(private http: HttpClient) { }
  findAllBooks(): Observable<Array<Book>> {
  return  this.http.get<Array<Book>>(this.url + `/all`) ;
  }

  findBookById(id: number): Observable<Book> {
  return this.http.get<Book>(this.url + `/getBook/${id}`) ;
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post(this.url + `/addBook` , book );
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.url + `/deleteBook/${id}`);
  }
  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(this.url + `/updateBook/${id}`, book);
  }
}
