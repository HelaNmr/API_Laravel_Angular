import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

import { TokenVar } from './token';
import { Tickets } from './tickets';



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem(TokenVar.token_type)} ${localStorage.getItem(TokenVar.access_token)}`
    })
};
@Injectable({
    providedIn: 'root'
})

export class TicketService {
    env = environment;

    constructor(private http: HttpClient, private messageService: MessageService) { }

    getTickets(): Observable<Tickets> {
        return this.http.get<Tickets>(this.env.apiUrl + 'api/tickets', httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getTicket(id: string): Observable<Tickets> {
        return this.http.get<Tickets>(this.env.apiUrl + 'api/tickets/' + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    createTicket(TicketFrom: FormGroup): Observable<Tickets> {
        return this.http.post<Tickets>(this.env.apiUrl + 'api/tickets', TicketFrom.value, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateTicket(ProductFrom: FormGroup, id: string): Observable<Tickets> {
        return this.http.put<Tickets>(this.env.apiUrl + 'api/tickets/' + id, ProductFrom.value, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    deleteTicket(id) {
        return this.http.delete(this.env.apiUrl + 'api/tickets/' + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    createReply(ReplyFrom: FormGroup, id): Observable<any> {
        return this.http.post(this.env.apiUrl + 'api/tickets/' + id + '/addReply', ReplyFrom.value, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}