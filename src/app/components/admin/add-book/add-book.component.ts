import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookServicesService } from 'src/app/services/book-services.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm = new FormGroup({
    productDesignation : new FormControl(''),
    productReference : new FormControl(''),
    quatiteInStock : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    bookTitle : new FormControl(''),
    bookAuthor : new FormControl(''),
    dateEdition : new FormControl(''),
});
  book: Book = new Book() ;
  submitted = false;

  constructor(private bookService: BookServicesService,
              private route: Router,
              public dialogRef: MatDialogRef<AddBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
  }
  saveBook(): any {
    this.book = new Book() ;
    this.book.bookAuthor = this.bookForm.get('bookAuthor')?.value;
    this.book.bookTitle = this.bookForm.get('bookTitle')?.value;
    this.book.dateEdition = this.bookForm.get('dateEdition')?.value ;
    this.book.price = this.bookForm.get('price')?.value ;
    this.book.productDesignation = this.bookForm.get('productDesignation')?.value ;
    this.book.productReference = this.bookForm.get('productReference')?.value ;
    this.book.quatiteInStock = this.bookForm.get('quatiteInStock')?.value;
    this.bookService.addBook(this.book).subscribe(
      () => this.bookService.findAllBooks().subscribe(
        data => { console.log(data);
                  this.dialogRef.close();
        }
      )
    );
    this.submitted = true ;
  }
  onNoClick(): void {
    this.dialogRef.close(); }
}
