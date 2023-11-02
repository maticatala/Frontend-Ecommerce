import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, QueryList, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/app/environments/environments';
import { UsersResponse } from '../interfaces/get-users.response';
import { map } from 'jquery';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl: string = environment.baseUrl;
  private htpp = inject(HttpClient);

  private _users = signal<User[] | null>(null);
  // private _meta = signal<Meta | null>(null);

  //! Al mundo exterior
  public users = computed( () => this._users() );
  // public meta = computed( () => this._meta() );


  // getUsers(page: number = 1, pagSize: number = 5): Observable<UsersResponse> {

  //   const headers = new HttpHeaders({
  //     'authorization': `Bearer ${localStorage.getItem('token')}`
  //   })

  //   return this.htpp.get<UsersResponse>(`${this.baseUrl}/auth?pageSize=${pagSize}&page=${page}`, { headers });
  // }

  getUsers(): Observable<User[]> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.htpp.get<User[]>(`${this.baseUrl}/auth`, { headers })
      .pipe(
        tap(users => this._users.set(users))
      );
  }

}
