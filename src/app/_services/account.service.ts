import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, Order } from '../_models';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public uniqueId;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(uniqueId, password) {
        this.uniqueId = uniqueId;
        return this.http.post(`${environment.apiUrl}/login`, { uniqueId, password });
    }

    logout() {
        // remove user from local storage and set current user to null
        this.router.navigate(['/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/member/add`, user);
    }

    placeOrder(uniqueId) {
        return this.http.post(`${environment.apiUrl}/order/add`, { uniqueId });
    }

    getAll() {
        return this.http.get<Order[]>(`${environment.apiUrl}/order/`+ this.uniqueId);
    }

    getUniqueId() {
        return this.uniqueId;
    }
}