import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books!: Array<Book>;
  action!: string;
  selectedBook!: Book |any;
  booksRecieved: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshData();
   }
   refreshData()
   {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        
        this.action = params['action'];
	
	
	const id = params['id'];
	
	
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
   }

   addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }

  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
 
     
  handleSuccessfulResponse(response:any) {
    this.books = new Array<Book>();
    
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {
    
      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte=book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }


}
