import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookModel, ProgressModel} from "../../models/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Component({
  selector: 'app-insertbook',
  templateUrl: './insertbook.component.html',
  styleUrls: ['./insertbook.component.css']
})
export class InsertbookComponent implements OnInit {

  book: FormGroup;
  title: AbstractControl
  constructor(private fb: FormBuilder, private bs: BooksService, private router: Router) {
    this.book = fb.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'year': ['', Validators.required]
    });
    this.title = this.book.controls['title'];
  }

  ngOnInit() {
  }

  InsertBook(formValue: any){
    const b = new BookModel();
    b.Author = formValue.author;
    b.Title = formValue.title;
    b.Year = formValue.year;
    b.Progress = [{ReportedOn: new Date, Units:0}];
    this.bs.InsertBook(b).subscribe((res: Response) => {
      if (res.status === 200){
        this.router.navigate(['/list']);
      }else{
        alert('Loso');
      }
    });
  }
  Home(){
    this.router.navigate(['/list']);
  }
}
