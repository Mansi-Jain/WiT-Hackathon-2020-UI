import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(uniqueId, password) {
        console.log(uniqueId);
        console.log(password);
        return this.http.post(`${environment.apiUrl}/login`, { uniqueId, password });
    }

    logout() {
        // remove user from local storage and set current user to null
        this.router.navigate(['/login']);
    }

    register(user: User) {
        console.log(user);
        return this.http.post(`${environment.apiUrl}/register`, user);
    }

    placeOrder() {
        console.log(this.userValue);
        return this.http.post(`${environment.apiUrl}/order`, this.userValue.uniqueId);
    }

}