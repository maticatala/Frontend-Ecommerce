// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, EmailResponse } from '../interfaces/contact-form.interface';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:3000' //URL backend

  constructor(private http: HttpClient) { }

  sendContactForm(formData: ContactForm): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(`${this.baseUrl}/contact`, formData);
  }
}
