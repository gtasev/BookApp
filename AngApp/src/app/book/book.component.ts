import {Component, Input, OnInit} from '@angular/core';
import {BookModel, ProgressModel} from "../../models/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: BookModel;
  flag: number;
  editButton: number;
  constructor(private bs: BooksService, private router: Router) { }

  ngOnInit() {
  }

  DeleteMe(id: string){
    this.bs.DeleteBook(id).subscribe((res: Response) => {
      if (res.status === 200){
        window.location.reload();
      }else{
        alert('loso');
      }
    });
  }

  OpenBook(id: string){
    this.router.navigate(['/book', id])
  }

  EditBook(id: string){
    this.flag = 1;
    this.router.navigate(['/book', id, this.flag])
  }
}
