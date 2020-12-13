import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  timeInterval: Subscription;
  quote: any | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = false;
    this.timeInterval = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.quoteService.getRandomQuote())
      )
      .subscribe(
        (res) => (this.quote = res),
        (err) => console.log(err.message)
      );
  }
}
