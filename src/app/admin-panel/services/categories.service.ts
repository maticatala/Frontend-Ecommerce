import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Category } from '../interfaces/category.interface';
import { PopularCategory } from '../interfaces/reports.interface';

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

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }


  updateCategory(id:number, data: any, file?:File): Observable<Category> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const body = this.createFormData(data, file);

    return this.http.patch<Category>(`${this.baseUrl}/categories/${id}`, body, {headers});
  }


  deleteCategory(id: number) {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })

    return this.http.delete(`${this.baseUrl}/categories/${id}`, {headers});
  }

  createCategory(data: any, file?: File): Observable<Category> {

    const headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })
    const body = this.createFormData(data, file);

    return this.http.post<Category>(`${this.baseUrl}/categories`, body, {headers})

  }

  createFormData(data: any, file?: File) {
    const formData = new FormData();

    if (file) formData.append('file', file); // Agrega la imagen al FormData

    formData.append('categoryName', data.categoryName);
    formData.append('description', data.description);

    return formData;
  }

  getPopularCategories(limit: number = 3): Observable<PopularCategory[]> {
    return this.http.get<PopularCategory[]>(`${this.baseUrl}/reports/popular-categories`, {
      params: { limit: limit.toString() }
    });
  }

}
