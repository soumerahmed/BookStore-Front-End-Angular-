import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LineCommand } from '../model/line-command';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineCommandServiceService {

url = 'http://localhost:8085/bookStore/api/lineCommand' ;

  constructor(private http: HttpClient) { }

addLineCommand(lineCommand: LineCommand): Observable<LineCommand> {
  return this.http.post(this.url + '/addLineCommand' , lineCommand ) ;
}

findAllLineCommand(): Observable<Array<LineCommand>> {
  return this.http.get<Array<LineCommand>>(this.url + '/all' ) ;
}

findAllLineCommandByIdBill(id: number): Observable<Array<LineCommand>> {
  return this.http.get<Array<LineCommand>>(this.url + `/getLineCommandByBill/${id}` ) ;
}

deleteLine(id: number): Observable<any> {
  return this.http.delete(this.url + `/deleteLineCommand/${id}`);
}

updateLine(id: number, lineCommand: LineCommand): Observable<any> {
  return this.http.put(this.url + `/updateLineCommand/${id}`, lineCommand);
}

}
