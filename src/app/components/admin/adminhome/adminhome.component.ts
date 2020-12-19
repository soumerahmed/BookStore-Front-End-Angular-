import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/book';
import { BookServicesService } from 'src/app/services/book-services.service';
import { BookDetailsComponent } from '../../book-details/book-details.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  books: Observable< Array<Book>> ;

  constructor(private bookService: BookServicesService, public dialog: MatDialog) {
    this.books = this.bookService.findAllBooks() ;
  }

  ngOnInit(): void {
    this.bookService.findAllBooks().subscribe();
  }

  deleteBook(id: any): void{
    this.bookService.deleteBook(id as number).subscribe(
      () => this.books = this.bookService.findAllBooks());
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: '600px',
      height: '600px',
      data : { name: id as number }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.books = this.bookService.findAllBooks() ;
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '600px',
      height: '600px',
      data : {  }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.books = this.bookService.findAllBooks() ;
      console.log('The dialog was closed');
    });
  }

  openDialogDetails(id: any): void {

    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '600px',
      height: '500px',
      data : { name: id as number }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
