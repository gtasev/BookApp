import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {BookModel, ProgressModel} from "../../models/book.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: BookModel[];
  constructor(private bs: BooksService ) {
    this.bs.GetBooks().subscribe((books) => {
      this.books = books;
    })
  }

  ngOnInit() {
  }

}
