import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { InsertbookComponent } from './insertbook/insertbook.component';
import {BooksService} from "../services/books.service";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '' ,redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: BooksComponent},
  {path: 'book/:id', component: EditbookComponent},
  {path: 'book/:id/:flag', component: EditbookComponent},
  {path: 'book', component: InsertbookComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    EditbookComponent,
    InsertbookComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
