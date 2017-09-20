import { Component, OnInit } from '@angular/core';
import {BookModel, ProgressModel} from "../../models/book.model";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Response} from "@angular/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  bookId: string;
  show: number;
  flag: number;
  book: BookModel;
  bookProgress: ProgressModel;
  bookGroup: FormGroup;
  progress: ProgressModel[];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private bs:BooksService, private router: Router) {
    this.bookGroup = this.fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'year': ['', Validators.required]
    });
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.flag = params['flag'];
      console.log(this.bookId);
      this.bs.GetBook(this.bookId).subscribe((book) => {
        this.book = book;
        console.log(this.book);
        this.progress = this.book.Progress;
      });
    });
  }

  ngOnInit() {
  }
  EditBook(formValue: any){
  let edited = new BookModel();
  if (formValue.title != '') {
    edited.Title = formValue.title;
  }else{
    edited.Title = this.book.Title;
  }
  if (formValue.author != '') {
    edited.Author = formValue.author;
  }else{
    edited.Author = this.book.Author;
  };
  if (formValue.year != 0 ) {
    edited.Year = formValue.year;
  }else{
    edited.Year = this.book.Year;
  };
  edited.Progress = [{ReportedOn: new Date, Units:0}];
  this.bs.EditBook(this.book.Id,edited).subscribe((res:Response) => {
    if (res.status === 200 ){
      this.router.navigate(['/list']);
    }else{
      alert('greska nekoja');
    }
  })
  }

  InputProgress(id: string, page: number){
    this.bookProgress = {ReportedOn: new Date, Units: page};
    if (page != 0){
    this.progress.push(this.bookProgress);
    this.book.Progress = this.progress;
    }else{
      this.book.Progress = this.progress;
    }
    this.bs.EditBook(id,this.book).subscribe((res: Response) => {
      if (res.status === 200){
        this.router.navigate(['/list']);
      }else{
        alert('greska nekoja');
      }
    })
  }
  Home(){
    console.log('hello');
    this.router.navigate(['/list']);
  }

}
