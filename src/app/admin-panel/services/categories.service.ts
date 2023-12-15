import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _categories = signal<Category[] | null>(null);

  //! Al mundo exterior
  public categories = computed( () => this._categories() );

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(
        tap(categories => this._categories.set(categories))
      );
  }

  updateCategory(id:number, body: any): Observable<Category> {
    return this.http.patch<Category>(`${this.baseUrl}/categories/${id}`, body);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(body: any): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, body)
  }

}
