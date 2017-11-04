import { Component, OnInit } from '@angular/core';
import { Quote } from './../quote.interface';
import { QuoteService } from './../quote.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  public quotes: Quote[];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
  }

  onGetQuotes() {
    this.quoteService.getQuotes()
    .subscribe(
      (quotes: Quote[]) => this.quotes = quotes,
      (err: HttpErrorResponse) => {
        alert(`Backend returned code ${err.status} with message: ${err.error}`);
      }
    );
  }

  onDeleted(quote: Quote) {
    const position = this.quotes.findIndex(
      (quoteEl: Quote) => {
        return quoteEl.id === quote.id;
      }
    );
    this.quotes.splice(position, 1);
  }

}
