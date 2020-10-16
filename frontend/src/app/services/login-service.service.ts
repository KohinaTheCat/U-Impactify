import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import model <3

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  // Using dependency injection, inject HttpClient
  constructor(private http: HttpClient) {}
}
