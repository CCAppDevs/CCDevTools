import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') base: string) {
    this.baseUrl = base + "api";
  }

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tickets`);
  }

  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tickets/${id}`);
  }

  createNewTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tickets`, ticket);
  }

  updateTicket(ticket: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tickets/${ticket.id}`, ticket);
  }

  createNewProject(project: any): Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}/projects`, project)
  }

  updateProject(project: any): Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.id}`, project);
  }
  
  deleteTicket(id: number): Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}/tickets/${id}`);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/projects/${id}`);
  }

  // board list
  getAllBoards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/taskboards`);
  }
}
