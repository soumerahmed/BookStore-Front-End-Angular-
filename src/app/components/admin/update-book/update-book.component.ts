import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/model/book';
import { BookServicesService } from 'src/app/services/book-services.service';
import { BookDetailsComponent } from '../../book-details/book-details.component';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  book: Book = new Book() ;
  bookForm = new FormGroup({
    idBook : new FormControl({ value: '', disabled: true }),
    productDesignation : new FormControl(''),
    productReference : new FormControl(''),
    quatiteInStock : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    bookTitle : new FormControl(''),
    bookAuthor : new FormControl(''),
    dateEdition : new FormControl(''),
});
  submitted = false;

  constructor(public dialogRef: MatDialogRef<BookDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {name: number},
              private bookService: BookServicesService) { }

ngOnInit(): void {
this.bookService.findBookById(this.data.name).subscribe(
    data => this.book = data ) ;
}
onNoClick(): void {
this.dialogRef.close(); }

updateBook(): void {
  this.book = new Book() ;
  this.book.idBook = this.bookForm.get('idBook')?.value ;
  this.book.bookAuthor = this.bookForm.get('bookAuthor')?.value;
  this.book.bookTitle = this.bookForm.get('bookTitle')?.value;
  this.book.dateEdition = this.bookForm.get('dateEdition')?.value ;
  this.book.price = this.bookForm.get('price')?.value ;
  this.book.productDesignation = this.bookForm.get('productDesignation')?.value ;
  this.book.productReference = this.bookForm.get('productReference')?.value ;
  this.book.quatiteInStock = this.bookForm.get('quatiteInStock')?.value;
  this.bookService.updateBook(this.bookForm.get('idBook')?.value, this.book).subscribe(
    data => { this.bookService.findAllBooks().subscribe(
      dataY => console.log(data)
    ) ;
              this.onNoClick() ;
              console.log(data) ; }
  ) ;
}


}
