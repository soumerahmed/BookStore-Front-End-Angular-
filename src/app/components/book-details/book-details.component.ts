import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/book';
import { BookServicesService } from 'src/app/services/book-services.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book() ;

  constructor(public dialogRef: MatDialogRef<BookDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {name: number},
              private bookService: BookServicesService) {
               }

  ngOnInit(): void {
   this.bookService.findBookById(this.data.name).subscribe(
     data => this.book = data
   ) ;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
