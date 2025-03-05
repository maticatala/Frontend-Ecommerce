// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, EmailResponse } from '../interfaces/contact-form.interface';
import { environment } from 'src/app/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  sendContactForm(formData: ContactForm): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(`${this.baseURL}/contact`, formData);
  }
}
