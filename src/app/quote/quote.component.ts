import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from './../quote.interface';
import { QuoteService } from './../quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  @Input() quote: Quote;
  @Output() quoteDeleted = new EventEmitter<Quote>();
  editing = false;
  editValue = '';

  constructor(private quoteService: QuoteService) { }
  ngOnInit() {
  }


  onEdit() {
    // if editing show input
    this.editing = true;
    // get the input's value
    this.editValue = this.quote.content;
  }

  onUpdate() {
    // reach backend
    this.quoteService.updateQuote(this.quote.id, this.editValue)
    .subscribe(
      (quote: Quote) => {
        // replace old quote with edited value
        this.quote.content = this.editValue;
        // after update reset editValue:
        this.editValue = '';
      }
    );
    // set editing to false
    this.editing = false;
  }

  onCancel() {
    this.editValue = '';
    this.editing = false;
      }


  onDelete() {
    this.quoteService.deleteQuote(this.quote.id)
    .subscribe(
      () => {
        this.quoteDeleted.emit(this.quote);
        console.log('Quote deleted');
      }
    );
  }

}
