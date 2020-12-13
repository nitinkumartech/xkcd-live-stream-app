import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  quote: () => '/getRandomXkcdLink',
};

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private httpClient: HttpClient) {}

  getRandomQuote(): Observable<string> {
    return this.httpClient.get(routes.quote()).pipe(
      map((body: any) => body),
      catchError((err) => {
        console.log(err.message);
        throw 'error in source. Details: ' + err.message;
      })
    );
  }
}
