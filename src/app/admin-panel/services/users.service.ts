import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _users = signal<User[] | null>(null);

  //! Al mundo exterior
  public users = computed( () => this._users() );

  getUsers(): Observable<User[]> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.get<User[]>(`${this.baseUrl}/auth`, { headers })
      .pipe(
        tap(users => this._users.set(users))
      );
  }

  updateUser(id:number, body: any): Observable<User> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })


    return this.http.patch<User>(`${this.baseUrl}/auth/${id}`, body, { headers });
  }

  deleteUser(id: number) {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.delete(`${this.baseUrl}/auth/${id}`, { headers });

  }

  createUser(body: any) {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<User>(`${this.baseUrl}/auth`, body, { headers })
  }

}
