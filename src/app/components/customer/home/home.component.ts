import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Book } from 'src/app/model/book';
import { Customer } from 'src/app/model/customer';
import { LineCommand } from 'src/app/model/line-command';
import { BillServiceService } from 'src/app/services/bill-service.service';
import { BookServicesService } from 'src/app/services/book-services.service';
import { CustomerServicesService } from 'src/app/services/customer-services.service';
import { LineCommandServiceService } from 'src/app/services/line-command-service.service';
import { BookDetailsComponent } from '../../book-details/book-details.component';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Observable<Array<Book>> ;
  book: Book = new Book() ;
  customer: Customer = new Customer() ;
  bill: Bill = new Bill() ;
  nbrLine: any ;
  lineCommand: LineCommand = new LineCommand(1, this.book, this.bill) ;
  idBill: any ;
  quantityForm = new FormGroup({
  quantity : new FormControl('', Validators.max(5)) });

  constructor(private bookService: BookServicesService,
              public dialog: MatDialog,
              private lineCommandService: LineCommandServiceService,
              private billService: BillServiceService,
              private customerService: CustomerServicesService,
              private cookieService: CookieService) {
    this.books = this.bookService.findAllBooks() ;
    this.lineCommandService.findAllLineCommandByIdBill(this.idBill).subscribe(
      dataNb => this.nbrLine = dataNb.length
      );
   }

  ngOnInit(): void {
    this.books = this.bookService.findAllBooks() ;
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '600px',
      height: '500px',
      data : { name: id as number }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogShop(): void {
    const dialogRef = this.dialog.open(BasketComponent, {
      width: '600px',
      height: '500px',
      data : {totalLineNbr: this.nbrLine as number}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addLineCommand(id: any): void {
    if (this.quantityForm.get('quantity')?.value <= 5 && this.quantityForm.get('quantity')?.value > 0 )
    {
    this.bookService.findBookById(id as number).subscribe(
      data => {this.book = data ;
               console.log(data);
               this.idBill = this.cookieService.get('idBill') ;
               this.billService.findBillById(this.idBill).subscribe(
                 dataB => {this.bill = dataB ;
                           console.log(dataB) ;
                           this.lineCommand.book = this.book ;
                           this.lineCommand.bill = this.bill ;
                           this.lineCommand.qt = this.quantityForm.get('quantity')?.value  ;
                           console.log(this.quantityForm.get('quantity')?.value );
                           this.lineCommandService.addLineCommand(this.lineCommand).subscribe(
                             dataL => {console.log(this.lineCommand);
                                       this.lineCommandService.findAllLineCommandByIdBill(this.idBill).subscribe(
                                       dataNb => this.nbrLine = dataNb.length
                                       );
                                      }
                           ) ;
                }
               ) ;
              }
        ) ;
      }
      else { console.log('None') ; }
  }
}
