import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-books',
  templateUrl: './view-all-books.component.html',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  styleUrls: ['./view-all-books.component.css']
})
export class ViewAllBooksComponent implements OnInit {
  private http: any;
  public bookList: any = {};
  public selectedBook: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get('http://localhost:8080/book/get').subscribe((data: any) => {
      this.bookList = data;
      console.log(this.bookList);
    });

  }

  deleteBook(){
    const bookId = this.selectedBook.id;
    this.httpClient.delete(`http://localhost:8080/book/${bookId}`,{responseType :'text'}).subscribe((response: string)=>{
      console.log(response);
      this.loadBooks();
      this.selectedBook=null;
      
    });
  
  }

  setSelectedBook(book: any) {
    this.selectedBook = book;
    console.log("this.selectedBook" + book.id);

  }
}

