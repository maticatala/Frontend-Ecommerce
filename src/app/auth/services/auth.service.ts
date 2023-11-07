import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { environment } from 'src/app/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User, RegisterResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  //Puede ser nulo en un d eterminado punto del tiempo
  private _currentUser = signal<User | null>(null);

  //Nos sirve para saber si el usuario está autenticado
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed(() => this._authStatus());


  constructor() {
    //Apenas se llama al servicio se ejecuta el metodo checkAuthStatus para validar el estado de authenticacion del usuario
    this.checkAuthStatus().subscribe();
   }


  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    //Almacenamos el token en el localStorage para poder recuperar los datos del usuario frente a un reload del navegador
    localStorage.setItem('token', token);

    return true;
  }

  findByEmail(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/${email}`;

    return this.http.get<boolean>(url);
  }

  login(email: string, password: string): Observable<boolean> {

    //URL para realizar el metodo POST
    const url = `${this.baseUrl}/auth/login`;

    //BODY con la informacion que mandaremos en el POST. El body de la peticion unicamente debido a como se construyo el backend solo puede recibir el email y el password
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        //Disparamos un efecto secundario de la peticion para almacenar los datos de la repuesta
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError( err => throwError( () => err.error.message ) )
      );
  }

  register(body:User): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError( err => throwError( () => err.error.message ) )
     )

  }

  checkAuthStatus(): Observable<boolean> {
    const url   = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        //Error
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

}
