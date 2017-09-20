import {Injectable} from "@angular/core";
import {Http, Response } from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {BookModel, ProgressModel} from "../models/book.model";
@Injectable()
export class BooksService{
  constructor(private http: Http){
  }

  GetBooks(): Observable<BookModel[]>{
    return this.http.get('http://localhost:8080/books').map((res:Response) => {
      const body = res.json();
      const books = [];
      body.forEach((book) => {
        const b = new BookModel();
        b.Id = book._id;              //vo insert se definirani so mali bukvi => book._id; book.author...
        b.Author = book.author;
        b.Title = book.title;
        b.Year = book.year;
        b.Progress = [];
        book.progress.forEach((pr) => {
          const p = new ProgressModel();
          p.Units = pr.Units;
          p.ReportedOn = pr.ReportedOn;
          b.Progress.push(p);
        });
        books.push(b);
      });
      return books;
    });
  }


  GetBook(id:string): Observable<BookModel>{
    return this.http.get(`http://localhost:8080/book/${id}`).map((res:Response) => {
      const body = res.json();
      const book = new BookModel();
      book.Id = body._id;
      book.Title = body.title;
      book.Author = body.author;
      book.Year = body.year;
      book.Progress = [];
      body.progress.forEach((pr) => {
        const p = new ProgressModel();
        p.Units = pr.Units;
        p.ReportedOn = pr.ReportedOn;
        book.Progress.push(p);
      });

      return book;
    });
  }

  InsertBook(book: BookModel): Observable<Response>{
    return this.http.post('http://localhost:8080/book',
      {
      title: book.Title,
      author: book.Author,
      year: book.Year,
      progress: book.Progress
    });
  }

  EditBook(id: string, book:BookModel): Observable<Response>{
    return this.http.put(`http://localhost:8080/book/${id}`,
      {
        title: book.Title,
        author: book.Author,
        year: book.Year,
        progress: book.Progress
      });
  }

  DeleteBook(id: string): Observable<Response>{
    return this.http.delete(`http://localhost:8080/book/${id}`);
  };
}

